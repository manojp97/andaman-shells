import { useState, useEffect } from "react";
import { Trash, Loader2 } from "lucide-react";
import API from "@/api/api";

import { Helmet } from "react-helmet-async";
// import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function PackageManager() {
  const [packages, setPackages] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [open, setOpen] = useState(false);

  const isFormValid = title.trim() !== "" && type.trim() !== "" && imageFile;

  // FETCH
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await API.get("/packages");
      setPackages(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD
  const handleAddPackage = async () => {
    if (!isFormValid) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("image", imageFile);

    try {
      setLoading(true);

      await API.post("/packages", formData);

      setTitle("");
      setType("");
      setImageFile(null);

      setOpen(false);

      fetchPackages();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      setDeleteLoading(id);

      await API.delete(`/packages/${id}`);

      fetchPackages();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(null);
    }
  };
  return (
    <SidebarProvider>
      <Helmet>
        <title>Package Manager | Andaman Shells Admin</title>
      </Helmet>
      <AppSidebar />

      <SidebarInset>
        {/* HEADER (UNCHANGED) */}
        <header className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Package Manager</h1>
          </div>

          <div className="font-medium">Total Packages: {packages.length}</div>
        </header>

        {/* CONTENT (UNCHANGED) */}
        <div className="p-4 md:p-6 space-y-6">
          {/* ADD PACKAGE */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-blue-500 text-white">
                Add Package
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm bg-gray-300">
              <DialogHeader>
                <DialogTitle>Add New Package</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label className="py-2">Package Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="py-2">Package Type</Label>
                  <Input
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="py-2">Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </div>
              </div>

              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  type="button"
                  onClick={handleAddPackage}
                  disabled={!isFormValid || loading}
                  className="bg-blue-500 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Package"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* TABLE */}
          <Card className="border rounded">
            <CardHeader>
              <CardTitle>All Packages</CardTitle>
            </CardHeader>

            <CardContent>
              {packages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No Packages Found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {packages.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-24 h-16 object-cover rounded-lg"
                            />
                          </TableCell>

                          <TableCell>{item.title}</TableCell>

                          <TableCell className="capitalize">
                            {item.type}
                          </TableCell>

                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={deleteLoading === item._id}
                              onClick={() => handleDelete(item._id)}
                            >
                              {deleteLoading === item._id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash size={16} className="text-red-600" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

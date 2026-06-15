import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Trash, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import API from "@/api/api";

import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function GalleryManager() {
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const isFormValid = !!imageFile;
  // const IMAGE_URL = "http://localhost:4000/uploads/";

  // FETCH IMAGES

  const fetchImages = async () => {
    try {
      const res = await API.get("/gallery");
      setImages(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ADD IMAGE

  const handleAddImage = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setLoading(true);

      await API.post("/gallery", formData);

      setImageFile(null);

      fetchImages();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE IMAGE

  const handleDelete = async (id) => {
    try {
      await API.delete(`/gallery/${id}`);
      fetchImages();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SidebarProvider>
      <Helmet>
        <title>Gallery Manager | Andaman Shells Admin</title>
      </Helmet>

      <AppSidebar />

      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Gallery Manager</h1>
          </div>

          <div className="font-medium">Total Images: {images.length}</div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6 space-y-6">
          {/* Add Image */}
          <Card className="border rounded">
            <CardHeader>
              <CardTitle>Add New Image</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />

                <Button
                  type="button"
                  onClick={handleAddImage}
                  disabled={!isFormValid || loading}
                  className="bg-blue-500 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Image"
                  )}
                </Button>
              </div>

              {imageFile && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="preview"
                    className="w-32 h-32 object-cover rounded border"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gallery */}
          <Card className="border rounded">
            <CardHeader>
              <CardTitle>All Gallery Images</CardTitle>
            </CardHeader>

            <CardContent>
              {images.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No Images Found
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {images.map((item) => (
                    <Card key={item._id}>
                      <CardContent className="p-3">
                        <img
                          src={item.image}
                          alt="Gallery"
                          className="w-full h-48 object-cover rounded-lg"
                        />

                        <Button
                          variant="destructive"
                          className="mt-3 w-full"
                          onClick={() => handleDelete(item._id)}
                        >
                          <Trash className="text-red-600" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

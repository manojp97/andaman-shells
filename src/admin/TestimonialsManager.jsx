import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Trash, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/api/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

//  CLEAN YOUTUBE ID FUNCTION

const getCleanYouTubeID = (url) => {
  try {
    let videoId = "";

    if (url.includes("youtu.be")) {
      videoId = url.split("/").pop();
    }

    if (url.includes("youtube.com")) {
      const match = url.match(/[?&]v=([^&]+)/);
      videoId = match ? match[1] : "";
    }

    if (videoId.includes("?")) {
      videoId = videoId.split("?")[0];
    }

    return videoId;
  } catch {
    return null;
  }
};

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);

  const [video, setVideo] = useState("");
  const isFormValid = video.trim() !== "";

  const fetchTestimonials = async () => {
    try {
      const res = await API.get("/testimonial");

      console.log("Testimonials:", res.data);

      setTestimonials(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  //  ADD FUNCTION (FIXED)

  const handleAdd = async () => {
    if (!video.trim()) return;

    const cleanId = getCleanYouTubeID(video);

    if (!cleanId) {
      alert("Invalid YouTube URL");
      return;
    }

    try {
      setLoading(true);

      await API.post("/testimonial", {
        video: cleanId,
      });

      setVideo("");

      await fetchTestimonials();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //  DELETE

  const handleDelete = async (id) => {
    try {
      await API.delete(`/testimonial/${id}`);

      fetchTestimonials();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SidebarProvider>
      <Helmet>
        <title>Testimonials Manager | Andaman Shells Admin</title>
      </Helmet>

      <AppSidebar />

      <SidebarInset>
        {/* HEADER */}
        <header className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Testimonials Manager</h1>
          </div>

          <p className="font-medium">Total: {testimonials.length}</p>
        </header>

        {/* CONTENT */}
        <div className="p-4 md:p-6 space-y-6">
          {/* ADD */}
          <Card className="border rounded">
            <CardHeader>
              <CardTitle>Add YouTube Testimonial</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col md:flex-row gap-3">
              <Input
                placeholder="Paste YouTube URL"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
              />

              <Button
                type="button"
                onClick={handleAdd}
                disabled={!isFormValid || loading}
                className="bg-blue-500 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add "
                )}
              </Button>
            </CardContent>
          </Card>

          {/* TABLE */}
          <Card className="border rounded">
            <CardHeader>
              <CardTitle>All Testimonials</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Video</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {testimonials.length > 0 ? (
                      testimonials.map((item) => (
                        <TableRow key={item._id}>
                          {/* VIDEO */}
                          <TableCell>
                            <iframe
                              className="w-40 h-24 rounded"
                              src={`https://www.youtube.com/embed/${item.video}`}
                              title="youtube video"
                              allowFullScreen
                            />
                          </TableCell>

                          {/* CLEAN ID */}
                          <TableCell>{item.video}</TableCell>

                          {/* DELETE */}
                          <TableCell>
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(item._id)}
                            >
                              <Trash className="text-red-600" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-6">
                          No Testimonials Found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

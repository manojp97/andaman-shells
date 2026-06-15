import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import API from "@/api/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppSidebar } from "@/components/app-sidebar";
import { Trash, Loader2 } from "lucide-react";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQManager() {
  const [faqs, setFaqs] = useState([]);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = question.trim() !== "" && answer.trim() !== "";

  // FETCH FAQS
  const fetchFaqs = async () => {
    try {
      const res = await API.get("/faqs");
      setFaqs(res.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // ADD FAQ
  const handleAddFAQ = async () => {
    if (!question.trim() || !answer.trim()) return;

    try {
      setLoading(true);
      await API.post("/faqs", {
        question,
        answer,
      });

      setQuestion("");
      setAnswer("");
      fetchFaqs();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE FAQ
  const handleDelete = async (id) => {
    try {
      await API.delete(`/faqs/${id}`);
      fetchFaqs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SidebarProvider>
      <Helmet>
        <title>FAQs Manager | Andaman Shells Admin</title>
      </Helmet>
      <AppSidebar />

      <SidebarInset>
        {/* HEADER */}
        <header className="flex h-16 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">FAQ Manager</h1>
        </header>

        <div className="p-4 md:p-6">
          {/* ADD FAQ */}
          <Card className="border rounded">
            <CardHeader>
              <CardTitle>Add New FAQ</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Input
                placeholder="Enter Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />

              <Input
                placeholder="Enter Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />

              <Button
                type="button"
                onClick={handleAddFAQ}
                disabled={!isFormValid || loading}
                className="bg-blue-500 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Faqs"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* FAQ LIST */}
          <Card className="mt-6 border rounded">
            <CardHeader>
              <CardTitle>All FAQs</CardTitle>
            </CardHeader>

            <CardContent className="p-2 md:p-6">
              {faqs.length > 0 ? (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                >
                  {faqs.map((item) => (
                    <AccordionItem
                      key={item._id}
                      value={String(item._id)}
                      className="bg-gray-100 px-4 sm:px-6 shadow-sm border-none"
                    >
                      <div className="flex items-center justify-between w-full">
                        <AccordionTrigger className="flex-1 text-left text-sm sm:text-base md:text-lg font-semibold hover:no-underline">
                          {item.question}
                        </AccordionTrigger>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item._id);
                          }}
                          className="ml-2"
                        >
                          <Trash size={16} className="text-red-600" />
                        </Button>
                      </div>

                      <AccordionContent className="text-gray-600 leading-6 pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No FAQs Found
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

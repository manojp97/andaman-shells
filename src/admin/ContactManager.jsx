import { useEffect, useState } from "react";
import API from "@/api/api";

import { Card } from "../components/ui/card";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Trash } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function ContactManager() {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // FETCH CONTACTS FROM API
  const fetchContacts = async () => {
    try {
      const res = await API.get("/contacts");
      console.log("CONTACTS:", res.data);
      setContacts(res.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = contacts.slice(startIndex, startIndex + itemsPerPage);

  // DELETE CONTACT
  const handleDelete = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);
      fetchContacts(); // refresh list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SidebarProvider>
      <Helmet>
        <title>Contacts | Andaman Shells Admin</title>
      </Helmet>

      <AppSidebar />

      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">Contact Messages</h1>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6">
          {contacts.length === 0 ? (
            <p className="text-gray-500">No messages found</p>
          ) : (
            <Card className="overflow-x-auto border rounded">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S.No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {currentData.map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell>{startIndex + index + 1}</TableCell>

                      <TableCell className="font-medium">{item.name}</TableCell>

                      <TableCell>{item.phone}</TableCell>

                      <TableCell className="max-w-xs truncate">
                        {item.message}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item._id)}
                        >
                          <Trash size={16} className="text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* PAGINATION */}
              <div className="flex justify-end mt-5">
                <Pagination className="sm:ml-250">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

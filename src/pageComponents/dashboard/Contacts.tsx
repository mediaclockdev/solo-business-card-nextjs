'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Map, Plus, Download, Info, Search, Crown } from "lucide-react";
import React, { useState } from 'react';
//import { WorldMap } from "@/components/ui/WorldMap";

import dynamic from "next/dynamic";
const WorldMap = dynamic(() => import("@/components/ui/WorldMap"), { ssr: false });

const contacts = [
  {
    name: "rob buc",
    jobTitle: "CEO",
    company: "Irie Group2, Inc.",
    email: "rob@yahoo.com",
    phone: "3014334709",
    dateAdded: "Jul 11, 2025, 10:29 AM",
    type: "lead",
    notes: "Interested in premium package. Follow up next week.",
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      city: "New York",
      country: "USA",
      accuracy: 10
    }
  },
  {
    name: "rob2 buc2",
    jobTitle: "CFO", 
    company: "Irie World, Inc.",
    email: "rob@yahoo.com",
    phone: "3014334709",
    dateAdded: "Jul 11, 2025, 12:17 PM",
    type: "added",
    notes: "Met at networking event. Looking for cost-effective solutions.",
    location: {
      latitude: 51.5074,
      longitude: -0.1278,
      city: "London",
      country: "UK",
      accuracy: 15
    }
  },
  {
    name: "rob2 buc2",
    jobTitle: "CFO",
    company: "Irie World, Inc.", 
    email: "rob@yahoo.com",
    phone: "3014334709",
    dateAdded: "Jul 11, 2025, 12:17 PM",
    type: "lead",
    notes: "Referral from existing client. High priority prospect.",
    location: {
      latitude: 35.6762,
      longitude: 139.6503,
      city: "Tokyo",
      country: "Japan",
      accuracy: 20
    }
  }
];

export default function Contacts() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 2;

  const totalPages = Math.ceil(contacts.length / contactsPerPage);
  const startIndex = (currentPage - 1) * contactsPerPage;
  const currentContacts = contacts.slice(startIndex, startIndex + contactsPerPage);

  const handleRowClick = (contact) => {
    setSelectedContact(contact);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-muted-foreground flex items-center gap-2">
          Contacts [{contacts.length}]
          <Crown size={16} className="text-yellow-500" />
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsMapOpen(true)}
          >
            <Map className="h-4 w-4 mr-2" />
            Map
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            New Contact
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by name, email, title, company..."
          className="pl-10"
        />
      </div>


      {/* Contacts Grid */}
      <div className="grid gap-4">
        {currentContacts.map((contact, index) => (
          <Card 
            key={index} 
            className="p-4 cursor-pointer card-hover group"
            onClick={() => handleRowClick(contact)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {contact.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{contact.jobTitle}</p>
                  <p className="text-muted-foreground text-sm font-medium">{contact.company}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <Badge 
                    variant={contact.type === "lead" ? "secondary" : "outline"}
                    className="mb-2"
                  >
                    {contact.type}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{contact.dateAdded}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Contact Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedContact.name}</h3>
                <p className="text-muted-foreground">{selectedContact.jobTitle}</p>
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Company:</span>
                  <p className="text-sm">{selectedContact.company}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium">Email:</span>
                  <p className="text-sm">
                    <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                      {selectedContact.email}
                    </a>
                  </p>
                </div>
                
                <div>
                  <span className="text-sm font-medium">Phone:</span>
                  <p className="text-sm">{selectedContact.phone}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium">Type:</span>
                  <div className="mt-1">
                    <Badge variant={selectedContact.type === "lead" ? "secondary" : "outline"}>
                      {selectedContact.type}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm font-medium">Date Added:</span>
                  <p className="text-sm text-muted-foreground">{selectedContact.dateAdded}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium">Notes:</span>
                  <p className="text-sm text-muted-foreground">{selectedContact.notes}</p>
                </div>
                
                {selectedContact.location && (
                  <div>
                    <span className="text-sm font-medium">Location:</span>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm">{selectedContact.location.city}, {selectedContact.location.country}</p>
                      <p className="text-xs text-muted-foreground">
                        Lat: {selectedContact.location.latitude.toFixed(4)}, 
                        Lng: {selectedContact.location.longitude.toFixed(4)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Accuracy: ±{selectedContact.location.accuracy}m
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* World Map Dialog */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh]">
          <DialogHeader>
            <DialogTitle>Contact Locations Map</DialogTitle>
          </DialogHeader>
          <div className="flex-1 h-full">
            <WorldMap contacts={contacts} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

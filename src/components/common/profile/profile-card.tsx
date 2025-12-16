"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export default function ProfileCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Card className="w-full bg-muted">
      <CardHeader className="h-9.5 ">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <Button size="icon" variant="outline" onClick={handleToggle}>
            <ChevronDown
              className={cn(
                isOpen ? "rotate-180" : "rotate-0",
                "transition-transform"
              )}
            />
          </Button>
        </div>
      </CardHeader>
      {isOpen && <CardContent>{children}</CardContent>}
    </Card>
  );
}

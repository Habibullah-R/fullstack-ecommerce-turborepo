"use client"

import { format } from "date-fns";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import React from "react"
import { CalendarIcon } from "lucide-react";

const TodoList = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [open,setOpen] = React.useState<boolean>(false)
  return (
    <>
      <div>
          <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger className="w-full" asChild>
              <Button variant="default">
                <CalendarIcon/>
                {date ? format(date,"PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date)=>{
                    setDate(date)
                    setOpen(false)
                }}
                className="rounded-lg border m-0"
              />
            </PopoverContent>
          </Popover>
        <ScrollArea className="h-full mt-4">
          <div className="flex flex-col gap-4">
            <Card className="flex-row items-center p-4">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
              <label
                htmlFor="terms-checkbox-basic"
                className="text-muted-foreground"
              >
                Accept terms and conditions
              </label>
            </Card>
            <Card className="flex-row items-center p-4">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
              <label
                htmlFor="terms-checkbox-basic"
                className="text-muted-foreground"
              >
                Accept terms and conditions
              </label>
            </Card>
            <Card className="flex-row items-center p-4">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
              <label
                htmlFor="terms-checkbox-basic"
                className="text-muted-foreground"
              >
                Accept terms and conditions
              </label>
            </Card>
            <Card className="flex-row items-center p-4">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
              <label
                htmlFor="terms-checkbox-basic"
                className="text-muted-foreground"
              >
                Accept terms and conditions
              </label>
            </Card>
            <Card className="flex-row items-center p-4">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
              <label
                htmlFor="terms-checkbox-basic"
                className="text-muted-foreground"
              >
                Accept terms and conditions
              </label>
            </Card>
            <Card className="flex-row items-center p-4">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
              <label
                htmlFor="terms-checkbox-basic"
                className="text-muted-foreground"
              >
                Accept terms and conditions
              </label>
            </Card>
            <Card className="flex-row items-center p-4">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
              <label
                htmlFor="terms-checkbox-basic"
                className="text-muted-foreground"
              >
                Accept terms and conditions
              </label>
            </Card>
            <Card className="flex-row items-center p-4">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
              <label
                htmlFor="terms-checkbox-basic"
                className="text-muted-foreground"
              >
                Accept terms and conditions
              </label>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default TodoList;

"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

function ComboboxDemo({ id, setId }) {

  // const API_URL = import.meta.env.PROD 
  //   ? import.meta.env.VITE_API_URL_PROD 
  //   : import.meta.env.VITE_API_URL;
  const API_URL = import.meta.env.VITE_API_URL_PROD;

  
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [DummyName, setDummyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const fetchLaptops = async (searchQuery) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("apikey", `${import.meta.env.VITE_API_KEY}`);
    formData.append("method", "list_models");
    formData.append("param[model_name]", searchQuery);

    // console.log(searchQuery);
    try {
      const res = await axios.post(
        API_URL,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // console.log(res);
      setResult(res.data.result || []);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  // Debounce handler
  useEffect(() => {
    if (value) {
      const delayDebounce = setTimeout(() => {
        fetchLaptops(value);
      }, 500); // 300ms debounce

      return () => clearTimeout(delayDebounce); // Clean up the timeout
    }
  }, [value]);

  const handleInputChange = (inputValue) => {
    setValue(inputValue); // Update the query value
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="max-w-[300px] min-w-[200px] w-full justify-between overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {value ? value : "Select Laptop..."}
          {/* <ChevronsUpDown className="opacity-50" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search for laptop..."
            value={value}
            onValueChange={handleInputChange}
          />
          <CommandList>
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup>
              {Object.keys(result).map((laptop, index) => (
                <CommandItem
                  key={index}
                  value={result[laptop].model_info[0].noteb_name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setId(result[laptop].model_info[0].id);
                    setOpen(false);
                  }}
                >
                  {result[laptop].model_info[0].noteb_name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === result[laptop].model_info[0].noteb_name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ComboboxDemo;

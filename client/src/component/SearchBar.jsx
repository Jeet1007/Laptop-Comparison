import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Combobox,
  Transition,
  Dialog,
  ComboboxOption,
  TransitionChild,
  DialogPanel,
  ComboboxInput,
  ComboboxOptions,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const SearchBar = () => {
  //   const [data, setData] = useState([]);
  const { isOpen, setIsOpen } = useContext(DataContext);
  const [ResultLength, setResultLength] = useState(0);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const searchRef = useRef(null);

  const fetchLaptop = async () => {
    setLoading(true);
    const formData = new FormData();
    // formData.append("apikey",${import.meta.env.VITE_API_KEY});
    formData.append("apikey", "112233aabbcc");
    formData.append("method", "list_models");
    formData.append("param[model_name]", `${query}`); // Replace with the desired model name

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //   const parseResult = JSON.parse(res.data.result);
      //   console.log(query);
      //   console.log(res.data.message);
      console.log(res.data.result);
      // console.log(res.data.result[0]);
      setResult(res.data.result); // Assuming you want to display the first 10 results
      //console.log(Object.keys(res?.data?.result?.length));
      const tempLength = Object.keys(res.data.result).length;
      setResultLength(tempLength);
      // console.log(length, res.data.result);
      setLoading(false);
    } catch (err) {
      console.log("Error", err);
      setLoading(false);
    }
  };

  useEffect(() => {
  //  fetchLaptop();
  if (query.length > 1) {
    fetchLaptop();
  } else {
    setResult([]);
    setResultLength(0);
  }
  }, [query]);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 z-50 bg-black bg-opacity-50">
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-start justify-center p-4 py-14 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-white"
                    >
                      Search Bar
                    </DialogTitle>
                    <Combobox as="div"
                      onChange={(e) => {
                        setResult([]);
                      }}
                    >
                      <div className="flex justify-between">
                        <div className="flex-grow pr-1 ">
                          <ComboboxInput
                            ref={searchRef}
                            className="mt-1 block w-full h-8 border border-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm rounded-md"
                            placeholder="Search Laptops"
                            value={query}
                            onChange={(e) => {
                              setQuery(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && result) {
                                console.log("clicked");
                                setIsOpen(false);
                                setResult([]);
                                setQuery("");
                                setResultLength(0);
                                navigate(`/lappy/search/${e.target.value}`);
                              }
                            }}
                            autoComplete="off"
                          />

                          <ComboboxOptions
                            static onClick={() => setIsOpen(false)} className="border-spacing-y-1   h-64 rounded-md overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-900">
                            {!Loading ? (
                              <Fragment>
                                {result && ResultLength
                                  ? Object.keys(result)
                                    .slice(0, 50)
                                    .map((key, index) => {
                                      return (
                                        <ComboboxOption
                                          key={index}
                                          value={
                                            result[key].model_info[0].name
                                          }
                                          className={({ active, hover }) =>
                                            `${active || hover
                                              ? "px-1  text-white hover:bg-blue-900"
                                              : ""
                                            }}`
                                          }
                                          onClick={() => {
                                            e.stopPropagation();
                                            console.log("hi");
                                            return navigate(
                                              `/lappy/info/${result[key].model_info[0].id}`
                                            );
                                          }}
                                        >
                                          <div className="flex flex-row hover:border hover:border-gray-500 hover:rounded-md h-16 mt-2">
                                            <div>
                                              <img
                                                src={
                                                  result[key].model_resources
                                                    .image_1
                                                }
                                                alt={
                                                  result[key].model_info[0]
                                                    .name
                                                }
                                                className="w-19 h-16"
                                              />
                                            </div>
                                            <div className="pl-3 mt-1 mb-1 h-6 cursor-pointer hover:h-9 hover:bg-black hover:rounded-md">
                                              <p>
                                                {
                                                  result[key].model_info[0]
                                                    .name
                                                }
                                              </p>
                                            </div>
                                          </div>
                                        </ComboboxOption>
                                      );
                                    })
                                  : query !== "" && (
                                    <p className="flex items-center justify-center px-4 py-0 gap-1">
                                      No results found.
                                    </p>
                                  )}
                              </Fragment>
                            ) : (
                              query !== "" && <div>Laptops Loading....</div>
                            )}
                          </ComboboxOptions>
                        </div>
                        <div className="">
                          <button
                            type="button"
                            className="flex justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-blue-100 hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => {
                              navigate(`/lappy/search/${query}`);
                              setIsOpen(false);
                              setQuery("");
                            }}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </Combobox>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default SearchBar;

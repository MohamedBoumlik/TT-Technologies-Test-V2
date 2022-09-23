import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";

function Thumbnail() {
  const [Images, setImages] = useState([]);
  const [Search, setSearch] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  // fetching data

  const FetchImages = () => {
    axios
      .get(
        "https://api.unsplash.com/photos/?client_id=0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23"
      )
      .then((res) => {
        setImages(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    FetchImages();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          {/* --------------------------- Title / Search Bar --------------------------- */}
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-gray-900">My Gallery</h2>
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                  <input
                    type="search"
                    className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------- Gallery --------------------------- */}
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {/* mapping through data and sorting it alphabetically by the user's name */}
            {Images &&
              Images.sort((a, b) =>
                a.user.first_name.localeCompare(b.user.first_name)
              ).map((img, index) =>
                // check if the User is searching for an image by user's name
                Search === "" ? (
                  <div className="group relative" key={index}>
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                      <img
                        src={img.urls.full}
                        alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                      {/* set the ImgUrl const with image url to show it in the modal after click on it*/}
                      <a
                        className="flex"
                        onClick={() => {
                          setImgUrl(img.urls.full);
                        }}
                      >
                        <span className="absolute inset-0 "></span>
                        {img.likes} <AiFillLike className="ml-1 mt-1" />
                      </a>
                    </h3>
                    <p className="text-base font-semibold text-gray-900 mb-6">
                      {img.user.first_name}
                    </p>
                  </div>
                ) : Search === img.user.first_name ? (
                  <div className="group relative" key={index}>
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                      <img
                        src={img.urls.full}
                        alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                      {/* set the ImgUrl const with image url to show it in the modal after click on it*/}
                      <a
                        className="flex"
                        onClick={() => {
                          setImgUrl(img.urls.full);
                        }}
                      >
                        <span className="absolute inset-0 "></span>
                        {img.likes} <AiFillLike className="ml-1 mt-1" />
                      </a>
                    </h3>
                    <p className="text-base font-semibold text-gray-900 mb-6">
                      {img.user.first_name}
                    </p>
                  </div>
                ) : null
              )}
          </div>
        </div>
      </div>

      {/* --------------------------- Image Modal --------------------------- */}
      {imgUrl !== "" ? (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className=" bg-gray-50 px-4 py-3 sm:flex sm:flex flex-col justify-center items-center sm:px-6">
                  <img src={imgUrl} alt="" />

                  {/* Empting the ImgUrl const after clicking on the exit button */}
                  <button
                    className="bg-transparent hover:bg-red-400 text-red-700 font-semibold hover:text-white border border-red-600 py-2 w-1/3 mt-4 hover:border-transparent rounded"
                    onClick={() => {
                      setImgUrl("");
                    }}
                  >
                    Exit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Thumbnail;

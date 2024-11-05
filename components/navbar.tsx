"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Navbar as NextUINavbar, NavbarContent, NavbarBrand, NavbarItem } from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import UserProfileModal from "@/components/userProfileModal";
import { axiosInstanceMicroService, axiosInstance } from "@/utils/interceptor";

export const fetchUserData = async () => {
  const response = await axiosInstanceMicroService.get(
    "/customerdata/1b2f7b83-7b4d-441d-a210-afaa970e5b76/"
  );
  console.log(response.data);
  return response.data;
};

const enableFeatures = async (newFeatures: object) => {
  console.log(newFeatures);
  for (const [feature, isEnabled] of Object.entries(newFeatures)) {
    const response = await axiosInstance.post("/enable-features/", {
      customer_id: "1b2f7b83-7b4d-441d-a210-afaa970e5b76",
      feature: feature,
    });
    console.log(response);
    window.location.reload();
  }
};

export const Navbar = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetchUserData()
      .then(
        (data) => {
          setUserData(data.data);
        },
        (error) => {
          console.error(error);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <img src="/edunextChallengeFront/logo.webp" alt="" className="h-10" />
            <p className="font-bold text-inherit">EduNext Challenge</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
        <ul>
          <UserProfileModal userData={userData} enableFeatures={enableFeatures} />
        </ul>
      </NavbarContent>
    </NextUINavbar>
  );
};

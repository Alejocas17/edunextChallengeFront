"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Divider,
  Spinner,
} from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { title } from "@/components/primitives";
import { axiosInstance } from "@/utils/interceptor";
import { fetchUserData } from "@/components/navbar";

type HandleChangeEvent = React.ChangeEvent<HTMLInputElement>;

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState("free");

  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchUserData()
      .then(
        (data) => {
          setUserData(data.data);
          setSelectedPlan(data.data.SUBSCRIPTION);
          setUserId(data.id);
          setIsLoaded(true);
        },
        (error) => {
          console.error(error);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e: HandleChangeEvent) => {
    console.log("angus", e.target.value);
    setSelectedPlan(e.target.value);
  };
  const handleSubmit = () => {
    const payload = {
      customer_id: userId,
      new_subscription: selectedPlan,
    };
    axiosInstance.post("/update-subscription/", payload).then((response) => {
      console.log(response);
      window.location.reload();
    });
  };

  return isLoaded ? (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Please select your &nbsp;</span>
        <span className={title({ color: "violet" })}>EduNext subscription&nbsp;</span>
      </div>
      <div id="CardContainer" className="flex flex-wrap justify-around p-4 m-20 items-center">
        <Card
          className={`flex-1 p-2 m-2 min-w-80 w-1/3 justify-center items-center ${
            selectedPlan === "free"
              ? "bg-gradient-to-tr from-blue-900 to-black-500 text-white shadow-lg"
              : ""
          } hover:bg-opacity-50`}
        >
          <CardHeader>
            <div className="flex flex-col">
              <p className={`text-md text-white ${selectedPlan === "free" ? "font-bold" : ""}`}>
                Free Subscription
              </p>
            </div>
          </CardHeader>
          <Divider />

          <CardBody>
            <RadioGroup value={selectedPlan} onChange={handleChange} orientation="vertical">
              <Radio value="free">Free Tier</Radio>
            </RadioGroup>
            <ul className="text-small text-gray-500 p-2">
              <li>✅ Feature 1</li>
              <li>❌ Feature 2</li>
              <li>❌ Feature 3</li>
            </ul>
          </CardBody>
          <Divider />
          <CardFooter>
            <p className="text-gray-500 text-sm">
              Price: <strong className="font-bold text-white ">$0 USD</strong>
            </p>
          </CardFooter>
        </Card>
        <Card
          className={`flex-1 p-2 m-2 min-w-80 w-1/3 justify-center items-center
          ${selectedPlan === "basic" ? "bg-gradient-to-tr from-green-900 to-black-500 text-white shadow-lg" : ""} hover:bg-opacity-50`}
        >
          <CardHeader>
            <div className="flex flex-col">
              <p className={`text-md text-white ${selectedPlan === "basic" ? "font-bold" : ""}`}>
                Basic Subscription
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <RadioGroup value={selectedPlan} onChange={handleChange} orientation="vertical">
              <Radio value="basic">Basic Tier</Radio>
            </RadioGroup>
            <ul className="text-small text-gray-500 p-2">
              <li>✅ Feature 1</li>
              <li>✅ Feature 2</li>
              <li>❌ Feature 3</li>
            </ul>
          </CardBody>
          <Divider />
          <CardFooter>
            <p className="text-gray-400 text-sm">
              Price: <strong className="font-bold text-white ">$10 USD</strong>
            </p>
          </CardFooter>
        </Card>
        <Card
          className={`flex-1 p-2 m-2 min-w-80 w-1/3 justify-center items-center
          ${selectedPlan === "premium" ? "bg-gradient-to-tr from-purple-900 to-black-500 text-white shadow-lg" : ""} hover:bg-opacity-50`}
        >
          <CardHeader>
            <div className="flex flex-col">
              <p className={`text-md text-white ${selectedPlan === "premium" ? "font-bold" : ""}`}>
                Premium Subscription
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <RadioGroup value={selectedPlan} onChange={handleChange} orientation="vertical">
              <Radio value="premium">Premium Tier</Radio>
            </RadioGroup>
            <ul className="text-small text-gray-500 p-2">
              <li>✅ Feature 1</li>
              <li>✅ Feature 2</li>
              <li>✅ Feature 3</li>
            </ul>
          </CardBody>
          <Divider />
          <CardFooter>
            <p className="text-gray-400 text-sm">
              Price: <strong className="font-bold text-white ">$15 USD</strong>
            </p>
          </CardFooter>
        </Card>
      </div>
      <Button
        radius="full"
        className={`text-xl hover:bg-opacity-50 ${selectedPlan === "free" ? "bg-gradient-to-tr from-blue-900 to-black-500 text-white shadow-lg" : selectedPlan == "basic" ? "bg-gradient-to-tr from-green-900 to-black-500 text-white shadow-lg" : "bg-gradient-to-tr from-purple-900 to-black-500 text-white shadow-lg"}`}
        onClick={handleSubmit}
      >
        Select {selectedPlan} Subscription
      </Button>
    </section>
  ) : (
    <Spinner />
  );
};

export default Subscription;

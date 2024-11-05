"use client";
import React, { use, useEffect } from "react";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
  Switch,
  User,
} from "@nextui-org/react";
// const FEATURES = {
//   CERTIFICATES_INSTRUCTOR_GENERATION: false,
//   ENABLE_COURSEWARE_SEARCH: false,
//   ENABLE_EDXNOTES: true,
//   ENABLE_DASHBOARD_SEARCH: false,
//   INSTRUCTOR_BACKGROUND_TASKS: false,
//   ENABLE_COURSE_DISCOVERY: false,
// };
type userData = {
  theme_name: string;
  user_email: string;
  user_profile_image: string;
  ENABLED_FEATURES: object;
  SUBSCRIPTION: string;
  UPGRADE_DATE: string;
  DOWNGRADE_DATE: string;
};

const UserProfileModal = (props: {
  userData: userData | null;
  enableFeatures: (newFeatures: object) => Promise<void>;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { userData, enableFeatures } = props;
  const [newFeatures, setNewFeatures] = useState(userData?.ENABLED_FEATURES || {});
  const [updatedFeatures, setUpdatedFeatures] = useState({});
  useEffect(() => {
    setNewFeatures(userData?.ENABLED_FEATURES || {});
  }, [userData]);
  return (
    <>
      <Button onPress={onOpen} className="bg-transparent h-10 hover:bg-gray-700" variant="bordered">
        Profile
        <Avatar className="bg-transparent h-7 w-7" src={userData?.user_profile_image} />
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-start">
                <User
                  name={userData?.theme_name}
                  description={userData?.user_email}
                  avatarProps={{
                    src: userData?.user_profile_image,
                  }}
                  className="flex items-start gap-2"
                />
                <p className="text-xs text-gray-500">Subscription: {userData?.SUBSCRIPTION}</p>
              </ModalHeader>
              <ModalBody>
                {userData?.SUBSCRIPTION !== "free" ? (
                  <>
                    <p>Enable / disable subscription features</p>
                    <div className="flexm items-start justify-center p-2">
                      {Object.keys(newFeatures).map((key) => (
                        <div className="flex-1 row" key={key}>
                          <Switch
                            defaultSelected={newFeatures[key as keyof typeof newFeatures]}
                            color="success"
                            onChange={(e) => {
                              if (!(key in newFeatures)) {
                                return;
                              }

                              const newFeature = { [key]: e.target.checked };
                              setUpdatedFeatures({
                                ...updatedFeatures,
                                ...newFeature,
                              });
                            }}
                          >
                            {key.replace(/_/g, " ")}
                          </Switch>
                          <br />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p>Upgrade to enable more features</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                  onPress={async () => {
                    console.log(newFeatures);
                    enableFeatures(updatedFeatures);
                    onClose;
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserProfileModal;

"use client";
import { FC, useState } from "react";
import axios, { AxiosError } from "axios";
import Button from "./ui/Button";
import { addFriendValidator } from "../lib/validation/add-friend";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
interface AddfriendButtonProps {}
type FormData = z.infer<typeof addFriendValidator>;
const AddFriendButton: FC<AddfriendButtonProps> = ({}) => {
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });
      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });
      setShowSuccessState(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }
      if (error instanceof AxiosError) {
        return setError("email", { message: error.response?.data });
      }
      setError("email", { message: "something went wrong" });
    }
  };
  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };
  return (
    <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900 "
      >
        Add Friend By Email
      </label>
      <div className="mt-2 flex gap-4">
        <input
          {...register("email")}
          type="text"
          className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
          placeholder="example@gmail.com"
        ></input>
        <Button isloading={false}> ADD</Button>
      </div>
      <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
      {showSuccessState ? (
        <p className="mt-1 text-sm text-green-500">Friend request sent !</p>
      ) : null}
    </form>
  );
};
export default AddFriendButton;

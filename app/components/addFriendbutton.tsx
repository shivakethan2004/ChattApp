"use client"
import { FC } from "react";
import Button from "./ui/Button";
import { addFriendValidator } from "../lib/validation/add-friend";
import {z} from 'zod'
interface AddfriendButtonProps {

}
const AddFriendButton: FC<AddfriendButtonProps> = ({}) =>{
    const addFrined = async (email:string) =>{
        try {
            const validatedEmail = addFriendValidator.parse({email})
            console.log(validatedEmail)
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.log(error.message)
            }
        }
    }
    return <form className="max-w-sm">
        <label htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900 ">
            Add Friend By Email
        </label>
        <div className="mt-2 flex gap-4">
            <input type="text" className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            placeholder="example@gmail.com"></input>
            <Button isloading= {false}> ADD</Button>
        </div>
        
    </form>
}
export default AddFriendButton
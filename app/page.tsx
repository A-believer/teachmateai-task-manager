"use client"
import AddTask from "@/components/addTask";
import Container from "@/components/container";
import Navbar from "@/components/navbar";
import Tasks from "@/components/tasks";
import { Button } from "@/components/ui/button";
import store, { AppDispatch, RootState } from "@/lib/redux/store";
import {Add} from "iconsax-react"
import { useState } from "react";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [openAddForm, setOpenAddForm] = useState<boolean>(false)
  return (
    <Provider store={store}>
      <Container className="w-full pb-10 relative">
      <Navbar/>
      <div className="lg:px-9 sm:px-7 px-5 flex flex-col items-center lg:gap-y-8 gap-y-5 max-w-[750px] w-full mx-auto">
        <h3 className="font-bold lg:text-3xl md:text-xl text-base">Task Management App</h3>
        <Button variant={"outline"} className="self-end" onClick={() => setOpenAddForm(true)}>
          <Add size="28"/>
          <span>Add Task</span>
        </Button>
        <Tasks />
        {openAddForm && <AddTask closeForm={() => setOpenAddForm(false)}/>}
      </div>
    </Container>
    </Provider>
  );
}

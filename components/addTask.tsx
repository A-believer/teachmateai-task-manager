"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DateInputField, InputField, TextAreaField } from "./form-exports"
import { Button } from "./ui/button"
import { Form } from "./ui/form"
import { CloseCircle } from "iconsax-react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/lib/redux/store"
import { addTask } from "@/lib/redux/slice"
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "./ui/use-toast"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title is required",
  }),
    description: z.string().min(2, {
    message: "description is required",
  }),
    dueDate: z.date({
    required_error: "Set a due date!",
    }),
    status: z.string(),
    id: z.string()
})
const useAppDispatch = () => useDispatch<AppDispatch>();

export default function AddTask({ closeForm }: { closeForm: () => void }) {
    const dispatch = useAppDispatch();
    const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
      defaultValues: {
        id: "",
        title: "",
        dueDate: new Date(),
        description: "",
        status: ""
    },
  })
    
    const {handleSubmit, control, formState, reset} = form

  
    function onSubmit({ title, dueDate, description, status }: z.infer<typeof formSchema>) {
        const taskData = {
            id: uuidv4(),
            title,
            dueDate,
            description,
            status: "pending"
        }

        if (title && dueDate && description) {
            dispatch(addTask(taskData))
        reset()
            closeForm()
            toast({
                title: "Task added successfully!!",
            })
        } else {
            toast({
                title: "Add Task Details!",
                variant: "destructive"
            })
        }
        
    console.log({
        title,
        dueDate,
        description,
        status
  })
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="absolute top-0 left-0 h-screen bg-black/50 flex items-center justify-center w-full">
                <div className="flex flex-col items-center gap-y-5 p-5 bg-background border-2 rounded-3xl lg:w-[450px] md:w-[350px] w-[85%] relative">
                 <h3>Add New Task</h3>
            <InputField<z.infer<typeof formSchema>>
              id="title"
              type='text'
             control={control}
            name='title'
            disabled={false}
            placeholder='Title'
            label='Title'
              formState={formState}
              inputClasses='w-full'
                />
            <TextAreaField
                    name="description"
                    control={control}
                    inputClasses=""
                    placeholder="Describe your task"
                    id="description"
                    formState={formState}
                    label="Description"
                />
            <DateInputField<z.infer<typeof formSchema>>
                    control={control}
                    name="dueDate"
                    label="Due Date"
                    dateClass=""
                    formState={formState}
                />
                

                    <Button type="submit" className="font-bold">Add Task</Button>   
                    <Button className="absolute top-4 right-4" type="button" onClick={closeForm} variant="ghost">
                        <CloseCircle/>
                    </Button> 
                </div>
                
            </form>
        </Form>
    )
    
}

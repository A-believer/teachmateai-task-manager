"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit, MinusSquare, Personalcard, TickSquare } from 'iconsax-react'
import { PersonStandingIcon, Trash } from 'lucide-react'
import { AppDispatch, RootState } from '@/lib/redux/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Task, deleteTask, updateStatus } from '@/lib/redux/slice';
import EditTask from './editTask';
import { getDate, getDay, getMonth, getYear } from 'date-fns';
import { toast } from './ui/use-toast';
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();

const categories = ["All", "Pending", "Complete"]

export default function Tasks() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const [openEditForm, setOpenEditForm] = useState<boolean>(false)
    const [taskId, setTaskId] = useState<string>("")
    const [task, setTask] = useState<Task>()
    const [categ, setCateg] = useState<string>("All")
    const [taskData, setTaskData] = useState<Task[]>(tasks)

    useEffect(() => {
        if (categ === "Pending") {
            const filteredTasks = tasks.filter((task) => task.status === "pending")
            setTaskData(filteredTasks)
        } else if (categ === "Complete") {
            const filteredTasks = tasks.filter((task) => task.status === "complete")
            setTaskData(filteredTasks)
        } else {
            setTaskData(tasks)
        }

    }, [categ, tasks])
    function deleteTaskWithId(id: string) {
        dispatch(deleteTask(id))
    }
    function handleEditModal(id: string) {
        setTaskId(id)
        for (let i = 0; i < tasks.length; i++) {
            if (id === tasks[i].id) {
                const taskData: Task = {
                    title: tasks[i].title,
                    description: tasks[i].description,
                    dueDate: tasks[i].dueDate,
                    status: tasks[i].status,
                    id: tasks[i].id
                }
                setTask(taskData)
            }
          setOpenEditForm(true)  
        }
    }

    function handleStatusUpdate(task: Task) { 
         const updatedStatus = task.status === 'pending' ? 'complete' : 'pending';
    dispatch(updateStatus({ ...task, status: updatedStatus }));
        toast({
                title: "task updated!",
            })
    }

    return (
        <div className='w-full md:space-y-5 space-y-3'>

            <div className='w-full flex justify-between items-center px-2 border-4 py-1 rounded-lg bg-foreground/20'>
                {categories.map((item, index) => (
                    <Button
                        className={`lg:px-5 md:px-4 px-3 w-[33.33%] hover:bg-transparent ${categ === item && "bg-background hover:bg-background"}`}
                        variant={'ghost'}
                        key={index}
                        onClick={() => setCateg(item)}>
                        {item}
                    </Button>
                ))}
            </div>

        <Table className='w-full'>
        <TableHeader className='rounded-xl md:mb-5 mb-3'>
            <TableRow className='md:text-lg text-sm'>
                <TableHead className="font-bold md:w-[200px] w-[150px]">
                            <p>Title</p>
                            <p>(Description)</p>
            </TableHead>
            <TableHead className="font-bold">Due Date</TableHead>
            <TableHead className="font-bold text-center">Status</TableHead>
            <TableHead className="space-x-2 font-bold text-right">
                <span>Edit</span>
            <span>Del</span>
            </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody className='md:mt-5 mt-3'>
         {taskData.length > 0 && taskData.map((task) => (
            <TableRow key={task.id} className=''>
                <TableCell className="font-medium md:w-[200px] w-[150px]">
                        <p className='md:text-lg text-base font-semibold'>{task.title}</p>
                        <p className='text-foreground/45'>{task.description}</p>
                </TableCell>
                <TableCell>{`${getYear(task.dueDate)}-${getMonth(task.dueDate) + 1}-${getDate(task.dueDate)}`}
                </TableCell>
                <TableCell>
                    <Button variant={'ghost'} onClick={() => handleStatusUpdate(task)} className={`flex items-center justify-center gap-x-2 align-top p-0 h-fit ${task.status === "pending" ? "text-orange-500" : "text-green-500"}`}>
                         {task.status === "pending" ?
                             <MinusSquare size="20" />
                             : <TickSquare size="20" />}
                         <span className='sm:flex hidden'>{task.status}</span> 
                    </Button>
                </TableCell>
                 <TableCell className="flex items-start justify-end space-x-5 pr-1">
                     <span>
                       <Button
                        className='cursor-pointer text-foreground/30 p-0 h-fit'
                        onClick={() => handleEditModal(task.id)} variant={'ghost'}>
                        <Edit size="20" />
                    </Button>  
                     </span>
                     <span>
                       <Button
                             onClick={() => deleteTaskWithId(task.id)}
                             className='cursor-pointer text-red-700 p-0 h-fit'
                             variant={'ghost'}>
                            <Trash size="20" />
                        </Button>  
                     </span>
                    
                    
                </TableCell>
            </TableRow>
         ))}
        </TableBody>
            </Table> 
            
            {taskData.length === 0 &&  <div className='w-full h-[15vh] border-2 rounded-2xl flex items-center justify-center'>
            No Tasks
        </div>
        }
            {openEditForm && <EditTask task={task} closeForm={() => setOpenEditForm(false)}/>}
      </div>
    

  )
}

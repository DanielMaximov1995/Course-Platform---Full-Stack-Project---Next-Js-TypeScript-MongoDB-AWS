'use client'
import React, {useEffect, useState} from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { updateLessonOrder } from "@/services/fetchData";
import { LessonType } from "@/types/SchemasType";
import EditIcon from "@/components/Icons/Edit Icon";
import AddOrEditLesson from "@/components/Layout/Lessons Area/Add Or Edit Lesson";

const Lessons = ({ allLessons }: { allLessons: LessonType[] }) => {
    const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);
    const [lessonOrder, setLessonOrder] = useState<LessonType[]>([]);

    useEffect(() => {
        if (lessonOrder.length !== allLessons.length) {
            setLessonOrder(allLessons);
        }
    }, [allLessons]);

    const handleDragEnd = async (result: DropResult) => {
        if (!result.destination) return;
        const reorderedLessons = Array.from(lessonOrder);
        const [removed] = reorderedLessons.splice(result.source.index, 1);
        reorderedLessons.splice(result.destination.index, 0, removed);
        setLessonOrder(reorderedLessons);
        await updateLessonOrder({ newOrder: reorderedLessons.map((lesson: LessonType) => lesson?._id) });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="w-full md:w-auto z-50 bg-accentSec dark:bg-accentBg rounded ">
                <div className="w-full mx-auto">
                    <table className="mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300">
                        <thead className="bg-accent">
                        <tr className="text-white">
                            <th className="font-semibold text-[20px] tracking-widest text-right uppercase px-6 py-4">שם שיעור</th>
                            <th className="font-semibold text-[20px] tracking-widest uppercase px-6 py-4 text-center">פעולה</th>
                        </tr>
                        </thead>
                    </table>
                    <Droppable droppableId="allLessons">
                        {(provided) => (
                            <table className="mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300">
                                <tbody
                                    className="dark:bg-[#fffaf4] bg-accentBg/60 divide-y divide-gray-200 overflow-y-auto"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                {lessonOrder.map((lesson, index) => {
                                    let lessonId = lesson?._id?.toString()!;
                                    return (
                                        <Draggable key={lessonId} draggableId={lessonId} index={index}>
                                            {(provided) => (
                                                <>
                                                    <tr
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <td className="px-6 py-4 text-accentSec dark:text-accentBg whitespace-nowrap">
                                                            {lesson.title}
                                                        </td>
                                                        <td className="px-6 py-4 flex justify-center text-accentSec dark:text-accentBg whitespace-nowrap">
                                                            <button onClick={() => setOpenAccordionId((prev: string | null) => (prev === lessonId ? null : lessonId))}>
                                                                <EditIcon />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr className={`transition-all duration-300 ${openAccordionId === lessonId ? 'table-row opacity-100' : 'hidden opacity-0'}`}>
                                                        <td colSpan={6}>
                                                            <div className="flex justify-center">
                                                                <AddOrEditLesson lessonData={lesson} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                                </tbody>
                            </table>
                        )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    );
};

export default Lessons;

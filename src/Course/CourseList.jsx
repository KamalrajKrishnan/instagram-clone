import Course from "../Course/Course";
import { useState, useEffect } from "react";
import useFetch from "../Utils/useFetch";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function CourseList() {
    const [courses, error] = useFetch(
        "http://localhost:3000/courses"
    );

    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        if (courses) {
            setCourseList(courses);
        }
    }, [courses]);

    const handleDelete = (id) => {
        console.log("Deleting:", id);

        setCourseList((prevCourses) =>
            prevCourses.filter(
                (course) => course.id !== id
            )
        );
    };

    // Loading
    if (courses === null && error === null) {
        return (
            <div className="flex justify-center items-center p-10">
                <img
                    src="/assets/loader.gif"
                    alt="Loading..."
                    className="w-12 h-12"
                />
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <p className="text-red-500">
                {error}
            </p>
        );
    }

    // No data available
    if (courseList.length === 0) { return ( <div className="flex justify-center items-center p-10"> <p className="text-gray-500 text-lg text-red-600"> No courses available. </p> </div> ); }
    return (
        <>       
            <Link
    to="/signup"
    className="inline-flex items-center gap-1 px-3 py-1.5
               rounded-md bg-gray-200 text-gray-700
               text-sm font-medium hover:bg-gray-300 transition"
>
    <ArrowLeftIcon className="w-4 h-4" />
    Back to Registration
</Link>  
        <div className="mx-auto grid max-w-4l grid-cols-5 gap-6">
            
            {(courseList.map((course) => (
                <Course
                    key={course.id}
                    name={course.name}
                    image={course.image}
                    tagline={course.tagline}
                    ratings={course.ratings}
                    price={course.price}
                    login={true}
                    delete={handleDelete}
                    id={course.id}
                />
            )))}
        </div>
        </>
    );
}

export default CourseList;
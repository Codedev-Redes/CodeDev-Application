export interface Course{
    id: number;
    name: string;
    description: string;
    course_price: number;
    categories_id: number;
    image: string;
    mentors_id: string;
}

export interface CourseId {
    _id: string;
    id: number;
    name: string;
    description: string;
    course_price: number;
    categories_id: number;
    image: string;
    mentors_id: string;
}

export interface ModulesId {
    _id: string;
    id: number;
    resorces_id: string;
    courses_id: string;
    title: string;
    name: string;
    description: string;
}
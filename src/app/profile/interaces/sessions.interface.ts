export interface SessionResponse{
    _id: string;
    students_id: string;
    mentorship_id: string;
    url: string;
}

export interface MentorshipResponse {
    _id: string;
    mentors_id: string;
    topic: string;
    type: string;
    start_date: string;
    end_date: string;
}

export interface MentorResponse{
    _id: string;
    name: string;
    last_name: string;
    email: string;
    speciality: string;
    modality: string;
    price: number;
}

export interface InfoShow{
    _id: string;
    nameMentor: string;
    lastNameMentor: string;
    email: string;
    speciality: string;
    modality: string;
    price: number;
    topic: string;
    type: string;
    start_date: string;
    end_date: string;
    url: string;
}
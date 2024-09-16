import { useState, useEffect } from "react";
import StudentService from "@/services/student.service";

const useLessonData = (stagePk) => {
    const [stageData, setStageData] = useState(null);
    const [showClassicLesson, setShowClassicLesson] = useState(false);
    const [showVideoLesson, setShowVideoLesson] = useState(false);
    const [showQuizLesson, setShowQuizLesson] = useState(false);

    useEffect(() => {
        if (stagePk) {
            const fetchData = async () => {
                const response = await StudentService.getLearnLesson(stagePk);
                if (response.status === 200 || response.status === 201) {
                    const data = response.data.data;
                    // console.log(response.data.data)
                    setStageData(data);
                    if (data.type === "classic") {
                        setShowClassicLesson(true);
                        setShowVideoLesson(false);
                        setShowQuizLesson(false);
                    } else if (data.type === "video") {
                        setShowClassicLesson(false);
                        setShowVideoLesson(true);
                        setShowQuizLesson(false);
                    } else if (data.type === "quiz") {
                        setShowClassicLesson(false);
                        setShowVideoLesson(false);
                        setShowQuizLesson(true);
                    } else {
                        setShowClassicLesson(false);
                        setShowVideoLesson(false);
                        setShowQuizLesson(false);
                    }
                }
            };
            fetchData();
        }
    }, [stagePk]);

    return { stageData, showClassicLesson, showVideoLesson, showQuizLesson };
};

export default useLessonData;
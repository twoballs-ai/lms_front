import React, { useState, useEffect } from "react";
import "./LessonsStyle.scss"
import StudentService from "../../../../../../services/student.service";
function LearningClassicLesson(props) {


    const [stageData, setStageData] = useState('')
    const [showClassicLesson, setShowClassicLesson] = useState(false)
    let stagePk = props.selectedStage ? props.selectedStage.id : null;


    useEffect(() => {
        if (stagePk) {
            setStageData('')
            const fetchData = async () => {
                await StudentService.getLearnLesson(stagePk).then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        // console.log(response.data.data.lesson.html_code_text)
                        if (response.data.data) {
                            setStageData(response.data.data);
                            setShowClassicLesson(true);
                        } else {
                            setInputTitleValue("")

                            setShowClassicLesson(true);
                        }
                    }
                });
            };
            fetchData();
        }
    }, [props, stagePk]);

    return (
        <>            
        {(showClassicLesson) && (
                   <div className={`content__${props.selectedStage.type}-lesson`}>
            <div className={`${props.selectedStage.type}-lesson__title`}>
            <p>Урок: {stageData.title}</p>
            </div>
            <div className={`${props.selectedStage.type}-lesson__add-block`}>
                
            <div dangerouslySetInnerHTML={{ __html: stageData.lesson.html_code_text }} />
            </div>
        </div>
        )}
        
        </>

    );
}

export default LearningClassicLesson;
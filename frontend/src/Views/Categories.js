import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import QuizzCard from '../Components/Quizz/QuizzCard';
import request from '../Components/Common/HttpRequests';
import Skeleton from 'react-loading-skeleton';

const Categories = () => {

    const { id } = useParams()
    const [quiz, setQuiz] = useState([])
    const [category, setCategory] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        let mounted = true
        if (mounted) {
            request.getCategoryId(id).then(res => {
                setCategory(res)
            })
            request.getCategoryQuiz(id).then(res => {
                setQuiz(res)
                setLoad(false)
            })
        }
        return function cleanup() {
            mounted = false
        }
    }, [id])

    return (
        <div className="quizapay-sn-element col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " data-sn-type="column" quizapay-data-sn-id="708fadd0b2414cd9a74d508c908e6f7d">
            <div className="quizapay-sn-element shadow_bottom container_content_limited container-fluid container_content_limited shadow_bottom" data-sn-type="container" quizapay-data-sn-id="804153d132b24a8f9a82dd5244a55d00">
        <div className="quizapay-sn-background quizapay-sn-background-container">
            <div className="quizapay-sn-background quizapay-sn-background-image"></div>
            <div className="quizapay-sn-background sn-foreground-color"></div>
        </div>
        <div className="quizapay-sn-element row " data-sn-type="row" quizapay-data-sn-id="c257ce519eb14b87aa95482d12f6038e">
            <div className="quizapay-sn-background quizapay-sn-background-container">
                <div className="quizapay-sn-background quizapay-sn-background-image"></div>
                <div className="quizapay-sn-background sn-foreground-color"></div>
            </div>
            <div className="quizapay-sn-element col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 " data-sn-type="column" quizapay-data-sn-id="42a08a1e0ca14b25adf643b2e06e7061">
                <div className="quizapay-sn-background quizapay-sn-background-container">
                    <div className="quizapay-sn-background quizapay-sn-background-image"></div>
                    <div className="quizapay-sn-background sn-foreground-color"></div>
                </div>
                <div data-sn-json-csseditor="0" className=" quizapay-sn-element sn_widget " data-sn-type="widget" quizapay-data-sn-id="4774" data-sn-code="sed_quiz_header" data-sn-nbview="0">
                    <div className="quizapay-sn-background quizapay-sn-background-container">
                        <div className="quizapay-sn-background quizapay-sn-background-image"></div>
                        <div className="quizapay-sn-background sn-foreground-color"></div>
                    </div>
                    <div className="quizapay-sn-element-content" id="sn_widget_4774">
                        <div id="w4778">
                            <div className="quiz_header">
                                <div className="d-flex align-items-center">
                                    <div>
                                        <img className="quiz_img" src={category.image} alt="" />
                                    </div>
                                    <h1 className="quiz_title">{category.title} </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br />
        <div data-sn-json-csseditor="1" className="quizapay-sn-element sn_widget" data-sn-type="widget" quizapay-data-sn-id="4771" data-sn-code="sed_list_item_page_slider" data-sn-nbview="1">
            <div className="quizapay-sn-background quizapay-sn-background-container">
                <div className="quizapay-sn-background quizapay-sn-background-image"></div>
                <div className="quizapay-sn-background sn-foreground-color"></div>
            </div>
            <div className="quizapay-sn-element-content" id="sn_widget_5107">
                <div id="w5107">
                    <div className="row">
                        {load? 
                                                                        
                            <>
                                    <div className="col-6 col-sm-4 col-md-6 col-lg-3 col-xl-3 type_list_item">
                                        <div className="item">
                                            <Skeleton className="img_quiz img-fluid" height={150} width={200} />
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-4 col-md-6 col-lg-3 col-xl-3 type_list_item">
                                        <div className="item">
                                            <Skeleton className="img_quiz img-fluid" height={150} width={200} />
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-4 col-md-6 col-lg-3 col-xl-3 type_list_item">
                                        <div className="item">
                                            <Skeleton className="img_quiz img-fluid" height={150} width={200} />
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-4 col-md-6 col-lg-3 col-xl-3 type_list_item">
                                        <div className="item">
                                            <Skeleton className="img_quiz img-fluid" height={150} width={200} />
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-4 col-md-6 col-lg-3 col-xl-3 type_list_item">
                                        <div className="item">
                                            <Skeleton className="img_quiz img-fluid" height={150} width={200} />
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-4 col-md-6 col-lg-3 col-xl-3 type_list_item">
                                        <div className="item">
                                            <Skeleton className="img_quiz img-fluid" height={150} width={200} />
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-4 col-md-6 col-lg-3 col-xl-3 type_list_item">
                                        <div className="item">
                                            <Skeleton className="img_quiz img-fluid" height={150} width={200} />
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-4 col-md-6 col-lg-3 col-xl-3 type_list_item">
                                        <div className="item">
                                            <Skeleton className="img_quiz img-fluid" height={150} width={200} />
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-4 col-md-6 col-lg-3 col-xl-3 type_list_item">
                                        <div className="item">
                                            <Skeleton className="img_quiz img-fluid" height={150} width={200} />
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-4 col-md-6 col-lg-3 col-xl-3 type_list_item">
                                        <div className="item">
                                            <Skeleton className="img_quiz img-fluid" height={150} width={200} />
                                        </div>
                                    </div>
                            </>
                            :
                            <>
                            {quiz.map((item) =>
                                <QuizzCard key={item.id} item={item} />
                            )}
                            </>
    
                        }
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Categories
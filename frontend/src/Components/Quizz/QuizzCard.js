import React from 'react'
import { Link } from 'react-router-dom'

const QuizzCard = ({ item }) => {
    return (
        <div className="col-6 col-sm-4 col-md-6 col-lg-3 col-xl-3 type_list_item">
            <Link to={`/quiz/${item.id}`}>
                <div className="item">                                                                            
                    <img className="img_quiz img-fluid" src={item.image} alt={item.name} title={item.name} />
                </div>
            </Link>
        </div>
    )
}

export default QuizzCard
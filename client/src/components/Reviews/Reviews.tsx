import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_reviews } from "../../actions/Reviews/Reviews"
import React /* { createElement, useState } */ from 'react';
import { Comment, Tooltip, Rate, Pagination } from 'antd';
import moment from 'moment';
import './Reviews.less'
import { FaUserCircle } from "react-icons/fa";
import addReview from './../addReview/AddReview';
import { IconContext } from 'react-icons';
//import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

export const Reviews = ({ idRv }: any) => {

    // const [likes, setLikes] = useState(0);
    // const [dislikes, setDislikes] = useState(0);
    // const [action, setAction] = useState('');

    // const like = (e:any) => {
    //     setLikes(e.target.value);
    //     setAction('liked');
    // };

    // const dislike = (e:any) => {
    //     setDislikes(e.target.value);
    //     setAction('disliked');
    // };

    // const actions = [
    //     <Tooltip key="comment-basic-like" title="Like">
    //         <span onClick={like}>
    //             {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
    //             <span className="comment-action">{likes}</span>
    //         </span>
    //     </Tooltip>,
    //     <Tooltip key="comment-basic-dislike" title="Dislike">
    //         <span onClick={dislike}>
    //             {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
    //             <span className="comment-action">{dislikes}</span>
    //         </span>
    //     </Tooltip>,

    // ];
    const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
    const dispatch = useDispatch()
    const rev = useSelector((state: any) => state.reviews.reviews)
    console.log("REV", rev)
    useEffect(() => {
        dispatch(get_reviews(idRv))
    }, [dispatch])


    return (
        <IconContext.Provider value={{ color: 'grey', size: '30px', style: { verticalAlign: 'middle', marginRight: "10px" } }}>
            <div>
                {
                    rev.length !== 0 ?
                        rev?.map((x: any) => (

                            <div className="newReviewContainer">
                                <div className="firstRowReview">
                                    <div>
                                        <FaUserCircle /> {x.user_id.first_name}
                                    </div>

                                    <div className="starReview">
                                        <Rate disabled value={x.rate} tooltips={desc} />
                                        {x.rate ? <span className='ant-rate-text'> {desc[x.rate - 1]}</span> : ''}
                                    </div>

                                </div>

                                <div className="secondRowReview">
                                    <div className="newReviewText">
                                        {(x.review)}
                                    </div>
                                    <div className="newReviewDate">
                                        <Tooltip title={moment().format('')}>
                                            <span>{moment().format(`YYYY-MM-DD`)}</span>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        )) :
                        <div className="noReviews">
                            No reviews about this category
                </div>
                }
            </div>
        </IconContext.Provider >

    )
}

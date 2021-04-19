import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_reviews } from "../../actions/Reviews/Reviews"
import React /* { createElement, useState } */ from 'react';
import { Comment, Tooltip, Rate, Pagination } from 'antd';
import moment from 'moment';
import './Reviews.less'
import addReview from './../addReview/AddReview';
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

    useEffect(() => {
        dispatch(get_reviews(idRv))
    }, [dispatch])



    return (
        <div className='review_container'>
            <div className='reviews_title'>Reviews</div>
            <div>
                {rev?.map((x: any) => (

                    <div className='reviews_comment' key={x.id}>
                        <div className='reviews_texto'>

                            {(x.review)}

                        </div>
                        <div className='review_DateRate'>
                            <div >
                                {
                                    <div className='reviews_date'>
                                        <Tooltip title={moment().format('')}>
                                            <span>{moment().format(`YYYY-MM-DD`)}</span>
                                        </Tooltip>
                                    </div>
                                }
                            </div>
                            <div className='reviews_rate'>
                                <Rate disabled value={x.rate} tooltips={desc} />
                                {x.rate ? <span className='ant-rate-text'> {desc[x.rate - 1]}</span> : ''}
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

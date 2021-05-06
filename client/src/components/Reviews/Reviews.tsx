import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_reviews } from "../../actions/Reviews/Reviews"
import { Rate } from 'antd';
import './Reviews.less'
import { FaUserCircle } from "react-icons/fa";
import { IconContext } from 'react-icons';

export const Reviews = ({ idRv }: any) => {

    const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
    const dispatch = useDispatch()
    const rev = useSelector((state: any) => state.reviews.reviews)
    useEffect(() => {
        dispatch(get_reviews(idRv))
    }, [dispatch, idRv])


    return (
        <IconContext.Provider value={{ color: 'grey', size: '30px', style: { verticalAlign: 'middle', marginRight: "10px" } }}>
            <div>
                {
                    rev.length !== 0 ?
                        rev?.map((x: any) => (

                            <div className="newReviewContainer">
                                <div className="firstRowReview">
                                    <div>
                                        <FaUserCircle /> Anonymous
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
                                        {/* <Tooltip title={moment().format('')}>
                                            <span>{moment().format(`YYYY-MM-DD`)}</span>
                                        </Tooltip> */}
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

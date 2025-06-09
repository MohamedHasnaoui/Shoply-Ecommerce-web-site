import React, { useEffect, useState } from 'react'
import { Card, ListGroup, Form, Button } from 'react-bootstrap'
import { StarRatingDisplay } from './StarRatingDisplay'
import { StarRatingInput } from './StarRatingInput';
import { Review } from '../../generated';
import { reviewService } from '../../services/review';
import { ApolloError } from '@apollo/client';
import { ErrorCode } from '../../constants/errors';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { client } from '../../graphqlProvider';
interface PropsType {
    productId:number
    reviews: Review[]
    numberofreviews:number
    refetchProduct: () => Promise<void>
}
const ReviewTab = (props:PropsType) => {
    const [reviewRating, setReviewRating] = useState<number>(0);
    const [reviewComment, setReviewComment] = useState<string>('');
    const [myReview,setMyReview] = useState<Review | undefined>(undefined); 
    const [isAllowedToReview, setIsAllowedToReview] = useState(false); 
    const [globalError, setGlobalError] = useState<string>("");
    const [reviewInputError, setReviewInputError] = useState<string>("");
    const navigate = useNavigate();
    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setReviewInputError("");
        if (reviewRating === 0) {
            setReviewInputError('Please select a rating before submitting your review.');
            return;
        }

        if (reviewComment.trim() === '') {
            setReviewInputError('Please write a comment for your review.');
            return;
        }


        try{
            if(!myReview?.id){
                const response = await reviewService.createReview(
                    {productId:props.productId,comment:reviewComment,rating:reviewRating});
                if(response.data?.createReview){
                    setMyReview(response.data.createReview);
                    await client.resetStore();
                    await props.refetchProduct();
                    toast.success('Thank you for your review! It has been submitted successfully.');
                }
            }else {
                const response = await reviewService.updateReview(
                    {id:myReview.id,comment:reviewComment,rating:reviewRating});
                if(response.data?.updateReview){
                    setMyReview(response.data.updateReview);
                    await client.resetStore();
                    await props.refetchProduct();
                    toast.success('Thank you for your review! It has been updated successfully.');
                }
            }
        }catch(e){
            const err = e as ApolloError;
            if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
                toast.error(err.graphQLErrors[0].message);
            }else {
                navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
            }
        }

    };
        

    const formatDate = (dateString?: string): string => {
    if (!dateString) return "No date available";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    };
    
    useEffect(()=>{
        const fetchIsAllowedToReview = async ()=>{
            try {
                const response = await reviewService.isbuyerAlowedToReview(props.productId);
                setIsAllowedToReview(response.data.isBuyerAllowedToReview);
            }catch(e){
                console.error("Error fetching product details:", e);
                const err = e as ApolloError;
                if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
                    setGlobalError(err.graphQLErrors[0].message);
                }else {
                    navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
                }
            }
        }
        fetchIsAllowedToReview();
    },[props.productId,navigate])

    useEffect(()=>{
        const fetchMyReview = async () =>{
            try {
                const response = await reviewService.getMyProductReview(props.productId);
                const review = response.data.getMyProductReview;
                if(review){
                    setMyReview(review);
                    setReviewRating(review.rating || reviewRating);
                    setReviewComment(review.comment || reviewComment);
                }
            }catch(e){
                console.error("Error fetching product details:", e);
                const err = e as ApolloError;
                if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
                    setGlobalError(err.graphQLErrors[0].message);
                }else {
                    navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
                }
            }
        }
        fetchMyReview();
    },[props.productId])
    if(globalError)  return <div className="alert alert-danger m-10">{globalError}</div>
  return (
    <div >
        <div className="tab-content-wrapper">
        {/* Existing Reviews */}
        <div className="reviews-section mb-5">
            <h4 className="section-title mb-3">Customer Reviews</h4>
            <ListGroup variant="flush">
            {props?.reviews?.map((review) => (
                review.id != myReview?.id &&
                <ListGroup.Item key={review.id} className="review-item">
                <Card className="review-card">
                    <Card.Body>
                    <div className="review-header mb-2">
                        <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <strong className="reviewer-name">{review.reviewer?.firstName} {review.reviewer?.lastName}</strong>
                            <div className="review-rating mt-1">
                            <StarRatingDisplay rating={review.rating || 0} />
                            </div>
                        </div>
                        <small className="review-date text-muted">
                            {formatDate(review?.createdAt)}
                        </small>
                        </div>
                    </div>
                    <p className="review-comment mb-0">{review.comment}</p>
                    </Card.Body>
                </Card>
                </ListGroup.Item>
            ))}
            </ListGroup>
        </div>

        {/* Write a Review Form */}
        {isAllowedToReview &&
        <div className="write-review-section">
            <h4 className="section-title mb-3">Write a Review</h4>
            <Card className="review-form-card">
                <Card.Body>
                    <Form onSubmit={handleReviewSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Your Rating</Form.Label>
                        <div className="rating-input-wrapper">
                        <StarRatingInput 
                            rating={reviewRating} 
                            setRating={setReviewRating} 
                        />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="review-comment">Your Review</Form.Label>
                        <Form.Control
                        id="review-comment"
                        as="textarea"
                        rows={4}
                        placeholder="Share your experience with this props..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        />
                    </Form.Group>
                    <div className='text-danger'>{reviewInputError}</div>
                    <Button 
                        variant="success" 
                        type="submit" 
                        className="submit-review-btn mt-12"
                    >
                        {myReview ? "Edit Review" : "Submit Review"}
                    </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
        }
        </div>
    </div>
  )
}

export default ReviewTab

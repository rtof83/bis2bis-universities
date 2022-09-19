import React from 'react';

const Carousel = () => {
    return (
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
            {/* <!-- Indicators --> */}
            <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>

            {/* <!-- Wrapper for slides --> */}
            <div className="carousel-inner" height role="listbox">
                <div className="item active">
                    <img src="https://ecomm-teste2.s3.amazonaws.com/assets/01.jpg" alt="store" />    
                </div>

                <div className="item">
                    <img src="https://ecomm-teste2.s3.amazonaws.com/assets/02.jpg" alt="store" />
                </div>

                <div className="item">
                    <img src="https://ecomm-teste2.s3.amazonaws.com/assets/03.webp" alt="store" />   
                </div>
            </div>

            {/* <!-- Left and right controls --> */}
            <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
            </a>
        </div>
    );
}

export default Carousel;

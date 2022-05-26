import { useEffect, useState } from "react";
import { api } from "../api";
import { Info } from "../typings/typings";

const AboutUsView = () => {

  const [infos, setInfo] = useState<Info[]>();

  useEffect(() => {
    const fetchData = () => {
      api.get("/info/get").then(({data }) => setInfo(data));
    };
    fetchData();
  }, []);

  return (
    <div style={{ margin: 10 }}>
    {infos?.map((info) => (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          border: "2px solid black",
          marginTop: 800,
          width: 700,
        }}
      >
    <div>
      <strong>About Us</strong>
      <h2><strong>FISHING STORE -&nbsp;</strong><strong>FISHING - OUR WHOLE WORLD</strong></h2>
      <h3>Why Us?&nbsp;</h3>
      <p>From the very beginning, we are guided by the idea of ​​creating a place that will be different than any other. We want everyone who visits us to feel that they will find not only the best products here, but also valuable information about fishing methods and techniques, as well as a range of tips and tests that will help you make your choice.</p>
      <div>Our whole life revolves around fishing. We've been fishing for as long as we can remember. At one point, fishing became a way of life for us. For the last few years, we have been creating an offer of fishing equipment in one of the leading companies on the Polish and international market. Hundreds of hours spent by the water catching various species of fish, and substantive knowledge based on experience in inventing, constructing and testing equipment allows us to be convinced that we are able to provide our customers with the highest standard of service. We are sure that our wide offer, competitive prices and efficient order fulfillment combined with many years of experience will allow us to meet the expectations of anglers. We guarantee the highest quality of service, support in the selection of equipment, and certainty that the choice is right.&nbsp;</div>
      <div>Our mission is to spread passion among others, to make fishing even more popular, more accessible, and finally, to make fishing shopping enjoyable. It does not matter if you are infected with a passion for fishing, or if you are just taking your first steps, we promise that we will draw you into our world, so that you will not want to leave it! There is no cure for this disease.</div>


      <div className="label">
        <div className="mb_button_wrap">
          <h3 className="label"> Need help? Advice in the selection of equipment? Please contact us. </h3>
          <p className="label"> Our team consists of fishing enthusiasts with many years of experience, both in terms of fishing and the selection of fishing equipment for various methods and techniques of fishing.; It doesn't matter if you are interested in technologically advanced spinning reels or are looking for your first float rod, we are ready to advise you and help you fulfill your dreams of catching the fish of a lifetime.; </p>
          <div className="label"> <strong> We are at your disposal both by e-mail {info.email} and by phone - {info?.phoneNumber} </strong> </ div >
          <h3 className="label"> <span> <strong> Why is it worth shopping with us? </strong> </span> </h3>
          <blockquote>
            <p className="label"> <strong> EXPRESS DELIVERY </strong> - Order placed before 1pm will be sent on the same day </p>
            <p className="label"> <strong>FREE SHIPPING </strong> - For purchases over PLN 199 we send your order for free </p>
            <p className="label"> <strong>  RETURN POSSIBLE </strong> - You can return the purchased products up to 60 days without giving any reason </p>
            <p className="label"> <strong>  LOCALISATION  </strong> - You can visit us also in our shop at {info?.address}</p>
            <p className="label"> <strong>  OPEN HOURS  </strong> - {info?.openHours} </p>
          </blockquote>
          <div className="label"> </div>
          <div className="label"> <strong> Loyal customer club </strong> - collect points with us that you can exchange for purchases. Be the first to know about news, promotions and sales </div>
          <div className="label"> </div>
          <div className="label"> </div>
          <div className="label"> </div>
          <div className="label">
            <h3 className="label"> <strong> The Fishing Store is a place where you can feel safe in every way. We will make sure that you get the best service, the best equipment as soon as possible and that you have the feeling that the products you buy will meet your expectations.</strong> </h3>
          </div>
        </div>
      </div>
    </div>
    </div>
      ))}
    </div>

  );
};

export default AboutUsView;

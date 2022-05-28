import React, {useState, useEffect} from 'react';

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = () => {
    setStripeToken(token)
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:5555/api/checkout/payment", {
          tokenId:stripeToken.id
          });
        console.log(res.data);
      } catch(err) {
        console.log(err)
      }
    };
    stripeToken && makeRequest
  }, [stripeToken])

  return (
    <div>Pay</div>
  )
}

export default Pay
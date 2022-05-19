import Summary from "../../../components/payment/paySummary";
import Form from "../../../components/payment/payForm";


export default function PayAddress() {

  return (
      <div className="flex wrapped justify-evenly">
        <div className="w-2/5">
          <Form/>
        </div>
        <div className="w-2/5 h-full">
          <Summary/>
        </div>
      </div>
 
  );
}

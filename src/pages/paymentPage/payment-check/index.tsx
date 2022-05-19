import Summary from '../../../components/payment/paySummary';
import Method from '../../../components/payment/payMethod';

export default function PayCheck() {
  return (
    <div className="flex wrapped">
      <div className="w-3/5">
        <Method />
      </div>
      <div className="w-2/5">
        <Summary />
      </div>
    </div>
  );
}

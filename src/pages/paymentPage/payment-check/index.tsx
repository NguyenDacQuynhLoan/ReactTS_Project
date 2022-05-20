import Summary from '../../../components/payment/paySummary';
import Method from '../../../components/payment/payMethod';

export default function PayCheck() {
  return (
    <div className="w-full flex flex-col md:lg:mx-auto  md:lg:flex md:lg:flex-row md:lg:w-4/5 md:lg:justify-evenly ">
      <div className="w-full block md:lg:hidden">
        <Summary />
      </div>
      <div className="w-full md:lg:w-3/5">
        <Method />
      </div>
      <div className="hidden md:lg:block md:lg:w-2/5">
        <Summary />
      </div>
    </div>
  );
}

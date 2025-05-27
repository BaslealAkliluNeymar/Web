export type PrintUtilProps = {
  data: {
    name: string;
    amount: number;
  };
};

const PrintUtil = ({ data }: PrintUtilProps) => (
  <div>
    <h1>Invoice for {data.name}</h1>
    <p>Amount: {data.amount}</p>
  </div>
);

export default PrintUtil;

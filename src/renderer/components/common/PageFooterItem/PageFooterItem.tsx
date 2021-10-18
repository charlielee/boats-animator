import "./PageFooterItem.css";

interface PageFooterItemProps {
  value: string;
}

const PageFooterItem = ({ value }: PageFooterItemProps): JSX.Element => {
  return <li className="page-footer-item">{value}</li>;
};

export default PageFooterItem;

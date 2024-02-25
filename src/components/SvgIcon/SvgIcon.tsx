import classnames from 'classnames';

interface ISvgIconProps {
  name: string;
  className?: string;
}

const SvgIcon: React.FC<ISvgIconProps> = ({ name, className }) => (
  <svg className={classnames('icon', className)} aria-hidden='true'>
    <use xlinkHref={`#${name}`}></use>
  </svg>
);
export default SvgIcon;

import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
    </Helmet>
  );
};

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
};

Meta.defaultProps = {
  title: 'Welcome To Water Tracker App',
  description:
    'The Water Tracker is a web application that allows users to track their daily water intake.',
  keywords:
    'web application, water tracker, daily water intake, hydration tracker, health, wellness, fitness, lifestyle',
};

export default Meta;

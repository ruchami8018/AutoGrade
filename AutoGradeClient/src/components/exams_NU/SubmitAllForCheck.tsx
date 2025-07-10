import { useState } from 'react';
import axios from 'axios';

const SubmitAllForCheck = ({ examId }: { examId: string }) => {
  const [loading, setLoading] = useState(false);
  const Api_base=import.meta.env.VITE_REACT_APP_BASE_API_URL;

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${Api_base}/ExamCheck/submit-all/${examId}`);
      const report = response.data;
      // כאן תוכלי לשמור את הדוח ב־state או להעביר לדף דוח
      console.log('Report:', report);
      // לדוגמה: ניתוב לעמוד תוצאות
    } catch (error) {
      console.error('Error submitting exams:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'שולח לבדיקה...' : 'העלאת הקבצים ובדיקתם'}
    </button>
  );
};

export default SubmitAllForCheck;

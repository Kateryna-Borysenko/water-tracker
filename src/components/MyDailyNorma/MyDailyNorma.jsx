import React, { useState } from 'react';
import styles from './MyDailyNorma.module.css';
import MyDailyNormaModal from './MyDailyNormaModal';

const MyDailyNorma = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.dailyNorma}>
      <h2 className={styles.dailyNormaTitle}>My daily norma</h2>
      <div className={styles.normaValue}>
        <span>2 L</span>
        <button
          id="editButton"
          className={styles.editButton}
          onClick={openModal}
        >
          Edit
        </button>
      </div>

      {modalOpen && <MyDailyNormaModal closeModal={closeModal} />}
    </div>
  );
};

export default MyDailyNorma;

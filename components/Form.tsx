import styles from "../styles/Form.module.css";

const Form = () => {
  return (
    <div className={styles.form}>
      <form>
        <div className={styles.form_group}>
          <label htmlFor="fullname">Fullname</label>
          <input type="text" id="fullname" name="fullname" required={true} />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required={true} />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="mobile">Mobile Number</label>
          <input type="text" id="mobile" name="mobile" required={true} />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" required={true} />
        </div>
        <div className={styles.radio_btns}>
          <label htmlFor="payment" className={styles.radio_label}>
            Payment Options
          </label>
          <label className={styles.container}>
            Cash on delivery
            <input type="radio" name="radio" defaultChecked={true} />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.container}>
            Debit/Credit card or bkash/nagad/upay payment
            <input type="radio" name="radio" defaultChecked={true} />
            <span className={styles.checkmark}></span>
          </label>
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_remember}>
            <input type="checkbox" />
            <span>I agree with terms and conditions</span>
          </label>
          {/* <a className="form-recovery" href="#">
              Forgot Password?
            </a> */}
        </div>
        <div className={styles.form_group}>
          <button type="submit">Place Order</button>
        </div>
      </form>
    </div>
  );
};

export default Form;

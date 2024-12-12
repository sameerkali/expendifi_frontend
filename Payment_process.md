**Expendifi Payment Process Documentation**

**Prepared By:** Sameer Faridi

---

### **1. Overview**

This document outlines the complete end-to-end payment process implementation for the Expendifi platform, targeting the Indian market using Razorpay. The document covers user payments, partner payouts, platform fee deductions, tax handling, legal compliance, and various edge cases to ensure a transparent and seamless payment experience.

---

### **2. Key Objectives**

1. **Facilitate Secure User Payments:** Enable users to pay for ad bookings easily using Razorpay’s payment gateway.
2. **Automate Partner Payouts:** Deduct platform fees (20%) and transfer the remaining amount to partners automatically.
3. **Ensure Tax Compliance:** Adhere to Indian tax laws, including GST and TDS, in all transactions.
4. **Transparent Process:** Provide clear transaction logs and notifications for all stakeholders.
5. **Handle Edge Cases:** Address failed payments, refunds, overbooking, and disputes effectively.

---

### **3. Payment Process Flow**

#### **3.1 User Payment Process**
1. **Booking Initiation:**
   - User selects an ad space and submits booking details.
   - Platform calculates the total cost based on the ad size, duration, and location.

2. **Payment Collection:**
   - User is redirected to Razorpay Checkout.
   - Payment options include:
     - UPI
     - Credit/Debit Cards
     - Net Banking
     - Wallets (e.g., Paytm, PhonePe).

3. **Payment Confirmation:**
   - Razorpay processes the payment and triggers a webhook to notify the platform of the payment status.
   - Success:
     - Booking is confirmed.
     - User receives a confirmation email/SMS.
   - Failure:
     - User is notified of the failed transaction.
     - Retry option is provided.

4. **Platform Fee Deduction:**
   - Razorpay’s Split Payment API deducts the platform fee (20%).
   - Remaining 80% is routed to a holding account for partner payouts.

#### **3.2 Partner Payout Process**
1. **Payout Scheduling:**
   - Payouts are processed weekly or after the booking is verified.
   - The platform calculates the partner’s share (80%) and initiates the payout via Razorpay’s Payout API.

2. **Partner Notifications:**
   - Partner is notified of the payout via email/SMS with transaction details.
   - Detailed breakdown:
     - Total Booking Amount
     - Platform Fee Deduction (20%)
     - Taxes Deducted (e.g., TDS)
     - Net Payout Amount

3. **Edge Cases in Payouts:**
   - Partner Bank Account Issues: Notify partners to update bank details.
   - Delayed Payouts: Provide real-time status updates and escalate issues to admin.

---

### **4. Tax Compliance and Transparency**

#### **4.1 Taxes on User Payments**
1. **GST:**
   - GST is included in the total booking amount charged to users.
   - GST slabs depend on the ad type and size:
     - 18% for most services.
   - Platform must issue GST-compliant invoices to users.

2. **Invoice Breakdown:**
   - Booking Amount: ₹1000
   - GST (18%): ₹180
   - Total: ₹1180

#### **4.2 Taxes on Partner Payouts**
1. **TDS Deduction:**
   - TDS (10%) is deducted from the partner’s payout if applicable.
   - The platform must provide TDS certificates quarterly.

2. **Payout Calculation Example:**
   - Total Booking Amount: ₹1000
   - Platform Fee (20%): ₹200
   - GST on Platform Fee: ₹36
   - Partner’s Share: ₹800
   - TDS Deduction (10% of ₹800): ₹80
   - Net Payout to Partner: ₹720

#### **4.3 Legal Compliance**
- Register the platform under GST and obtain a GSTIN.
- File monthly GST returns (GSTR-1, GSTR-3B).
- File TDS returns quarterly.

---

### **5. Razorpay Integration**

#### **5.1 Setting Up Razorpay**
1. **Create Razorpay Account:**
   - Sign up and complete KYC verification.
   - Add bank account details for receiving payments.

2. **Generate API Keys:**
   - Go to Razorpay Dashboard → API Keys → Generate Key.
   - Use the key ID and secret for integration.

#### **5.2 Backend Integration**
1. **Initialize Razorpay SDK:**
   ```javascript
   const Razorpay = require('razorpay');
   const razorpay = new Razorpay({
     key_id: 'YOUR_KEY_ID',
     key_secret: 'YOUR_KEY_SECRET',
   });
   ```

2. **Create Payment Order:**
   ```javascript
   const createOrder = async (amount, currency, receipt) => {
     const options = {
       amount: amount * 100, // Amount in paise
       currency: currency,
       receipt: receipt,
     };
     const order = await razorpay.orders.create(options);
     return order;
   };
   ```

3. **Handle Webhooks:**
   - Set up a webhook URL in Razorpay Dashboard.
   - Capture events like `payment.captured` and `payment.failed` to update your database.

4. **Initiate Payouts:**
   ```javascript
   const initiatePayout = async (accountId, amount) => {
     const payout = await razorpay.payouts.create({
       account_id: accountId,
       amount: amount * 100,
       currency: 'INR',
       purpose: 'payout',
     });
     return payout;
   };
   ```

#### **5.3 Frontend Integration**
1. **Install Razorpay Checkout SDK:**
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```

2. **Trigger Razorpay Checkout:**
   ```javascript
   const options = {
     key: 'YOUR_KEY_ID',
     amount: amount * 100, // Amount in paise
     currency: 'INR',
     name: 'Expendifi',
     description: 'Ad Booking Payment',
     order_id: orderId, // Generated by backend
     handler: function (response) {
       // Handle payment success
     },
     prefill: {
       name: userName,
       email: userEmail,
     },
   };
   const rzp = new Razorpay(options);
   rzp.open();
   ```

---

### **6. Edge Cases and Solutions**

#### **6.1 Failed Payments**
- **Scenario:** Payment fails during user checkout.
- **Solution:**
  - Provide retry option.
  - Reserve the ad space for 10 minutes to avoid conflicts.

#### **6.2 Refunds**
- **Scenario:** User cancels booking before installation.
- **Solution:**
  - Partial or full refund based on platform policy.
  - Refund API:
    ```javascript
    const refundPayment = async (paymentId, amount) => {
      const refund = await razorpay.payments.refund(paymentId, { amount });
      return refund;
    };
    ```

#### **6.3 Overbooking**
- **Scenario:** Two users try to book the same ad space.
- **Solution:**
  - Lock ad space for 15 minutes during payment processing.
  - Notify the second user about unavailability.

#### **6.4 Disputed Payouts**
- **Scenario:** Partner disputes payout amount.
- **Solution:**
  - Provide detailed transaction breakdown in the partner dashboard.
  - Escalate unresolved disputes to admin.

---

### **7. Cost and Fees**

#### **7.1 Razorpay Fees**
- **Transaction Fee:** 2% + GST per transaction.
- **Payout Fee:** ₹5 per payout (for standard bank transfers).

#### **7.2 Platform Charges**
- Deduct 20% from each booking as the platform fee.
- Transparent fee structure in user and partner invoices.

---

### **8. Example Stories**
#### **8.2 Partner’s Perspective**
Suman, a partner who owns wall ad spaces in Chennai, lists her property on Expendifi. She uploads clear photos, provides the dimensions (10x20 feet), and sets a daily rental rate of ₹800. After receiving Ravi's booking for ₹1000, Suman is notified of the booking and installation date. Once the ad is installed and verified, Suman receives ₹720 (post-platform fee and TDS deductions). The entire transaction breakdown is visible in her dashboard, ensuring transparency.
#### **8.3 Expendifi’s Perspective**
Expendifi earns ₹200 from Ravi’s booking after deducting Razorpay's transaction fee (₹23.6, including GST). The remaining ₹176.4 is the platform’s profit. Expendifi ensures smooth transactions, updates both Ravi and Suman about the booking status, and adheres to legal compliance by filing GST and TDS returns monthly.
#### **8.4 Government’s Perspective**
Expendifi complies with Indian tax regulations by collecting GST on user payments and deducting TDS from partner payouts. The platform files monthly GST returns (GSTR-1, GSTR-3B) and quarterly TDS returns. This ensures that the government receives its share of taxes while maintaining trust with stakeholders.
#### **8.5 Edge Case: Failed Payment**
Ravi attempts to book an ad space but the payment fails due to insufficient UPI balance. Expendifi reserves the ad space for 10 minutes while Ravi retries. On the second attempt, the payment succeeds. If the retry fails within 10 minutes, the space is released for others.
#### **8.6 Edge Case: Refund Scenario**
Ravi cancels his booking 24 hours before the installation date. Per the refund policy, Ravi is eligible for an 80% refund (₹800). Expendifi processes the refund through Razorpay, deducting ₹23.6 as the transaction fee. Ravi receives ₹776.4 in his account within 5 business days.
#### **8.7 Edge Case: Disputed Payout**
Suman disputes her payout, claiming that the TDS deduction is incorrect. Expendifi reviews the detailed transaction breakdown, verifies the TDS deduction (10% of ₹800), and provides her with a TDS certificate for tax filing purposes. Suman is satisfied with the resolution.


---

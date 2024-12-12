**Expendifi Partner Side FRD**

**Prepared By:** Sameer Faridi

---

### **1. Overview**

The Partner Side module is designed to manage partners who provide ad spaces for physical advertisements in various categories. This module facilitates partner registration, document verification, ad space uploads, booking management, payment handling, and performance tracking. Additionally, it ensures transparency and trust between partners, users, and the platform.

---

### **2. Key Objectives**

1. **Streamline Partner Onboarding:** Ensure a simple and intuitive registration process.
2. **Enable Efficient Ad Management:** Allow partners to upload, manage, and track their ad spaces.
3. **Facilitate Transparent Earnings:** Provide partners with detailed insights into their bookings, earnings, and payouts.
4. **Improve Communication:** Offer real-time notifications for approvals, bookings, and payments.
5. **Mitigate Risks:** Address cancellation policies, payment failures, and dispute resolutions.

---

### **3. Functional Requirements**

#### **3.1 Partner Onboarding**

##### **3.1.1 Registration Process**

- **Input Fields:**
  - Name
  - Email
  - Password
  - Location
  - Contact Number (Optional)
  - Date of Birth (DOB)
- **Document Upload:**
  - PAN Card
- **Output:**
  - Store partner details securely in the database.
  - Assign a unique Partner ID upon successful registration.

##### **3.1.2 Document Verification**

- **Steps:**
  1. Admin reviews submitted documents.
  2. Notify partners if corrections or additional documents are required.
  3. Approve/reject applications within 2-3 business days.
- **Edge Cases:**
  - Incomplete/Invalid Documents: Notify partners to re-upload without restarting the process.
  - Delayed Approval: Notify partners of delays and provide an estimated timeline.

##### **3.1.3 Platform Access**

- **Post-Approval Actions:**
  - Grant partners access to their dashboard.
  - Display a guided tutorial on how to use the platform.

---

#### **3.2 Ad Space Management**

##### **3.2.1 Ad Space Upload**

- **Input Fields:**
  - Photos (High-quality images of the ad space).
  - Title (Short and descriptive).
  - Description (Detailed explanation of the ad space).
  - Location (City, Locality).
  - Size (Dimensions in feet, e.g., [10] [20]).
  - 1-Day Rate (24-hour rental rate).
  - Landmark (Nearby identifiable landmark).
  - Full Address (Complete address of the ad space).
  - Keywords (Up to 5 relevant keywords for search optimization).
- **Validation:**
  - Ensure all mandatory fields are completed before submission.
  - Verify uploaded photos meet quality standards.
- **Output:**
  - Save ad space details in the database.
  - Notify the admin for review and approval.

##### **3.2.2 Admin Approval**

- **Steps:**
  1. Admin verifies the uploaded ad space details, photos, and description.
  2. Approve or reject based on platform guidelines.
  3. Notify partners of the decision via in-app notifications and WhatsApp.
- **Edge Cases:**
  - Rejected Ads: Partners can modify and re-upload without starting from scratch.
  - Delayed Approvals: Auto-approve ads after a set period if no action is taken by the admin.

---

#### **3.3 Booking Management**

##### **3.3.1 Booking Confirmation**

- **Notifications:**
  - Notify partners of new bookings via:
    - In-app notifications.
    - WhatsApp alerts with booking details (e.g., date, location, ad type).
- **Details Shared with Partners:**
  - Ad Type, Title, Size, and Duration.
  - Installation timeline and user requirements.
  - Booking amount and expected earnings.
- **Edge Cases:**
  - Non-Responsive Partners: Notify admin if no response is received within 24 hours.
  - Simultaneous Bookings: Lock ad spaces for 15 minutes during payment to avoid conflicts.

##### **3.3.2 Ad Installation and Verification**

- **Ad Installation Steps:**
  1. Partners install ads as per booking requirements.
  2. Upload photographic or video evidence of the installed ad.
- **Verification Process:**
  - Admin or third-party teams verify installations.
  - Notify partners of any discrepancies and provide a grace period for resolution.
- **Edge Cases:**
  - Missing/Incorrect Installations: Penalize partners and offer refunds to users if unresolved.

---

#### **3.4 Earnings and Payments**

##### **3.4.1 Earnings Dashboard**

- **Features:**
  - Display detailed earnings breakdown (per ad type, size, and duration).
  - Show total revenue, pending payments, and completed bookings.
  - Highlight service fee deductions and net payouts.
- **Edge Cases:**
  - Payment Disputes: Allow partners to raise tickets for discrepancies. Admin resolves within 2-3 business days.

##### **3.4.2 Payment Process**

- **Payment Cycle:** Weekly or monthly payouts.
- **Payment Methods:** Bank transfer via Razorpay.
- **Notifications:**
  - Notify partners of successful payouts.
  - Share detailed payout receipts.

---

#### **3.5 Risk Management**

##### **3.5.1 Cancellations by Partners**

- **Risk:** Partner cancels after user payment.
- **Mitigation:**
  - Admin mediation to resolve disputes.
  - Offer users a full refund or alternative ad space.
  - Penalize partners for cancellations without valid reasons.

##### **3.5.2 Consistent Violations**

- **Action:**
  - Suspend or permanently ban partners after repeated cancellations or violations.

---

#### **3.6 Notifications for Partners**

- **Types of Notifications:**
  - Booking confirmations.
  - Ad space approvals/rejections.
  - Payment receipts.
  - Ad installation status.
- **Modes of Communication:**
  - In-app notifications.
  - WhatsApp integration for quick alerts.

---

### **4. Technical Requirements**

1. **Database Design:**
   - Separate tables for partner details, ad spaces, bookings, and payouts.
   - Real-time availability tracking using relational tables.
2. **API Requirements:**
   - Partner registration and document upload API.
   - Ad space management API (CRUD operations).
   - Notifications API for in-app and WhatsApp updates.
   - Razorpay integration for payments and payouts.
3. **Authentication:**
   - Secure login using OTP-based authentication.
   - Role-based access control (RBAC) for partners, admins, and super admins.
4. **UI/UX Design:**
   - Intuitive dashboard for partners with real-time data visualization.
   - Mobile-friendly interface for notifications and earnings tracking.

---

### **5. Edge Cases and Solutions**

1. **Incomplete Registration:** Notify partners to complete missing details without restarting the process.
2. **Ad Space Conflicts:** Lock spaces during payment to prevent double booking.
3. **Payment Failures:** Allow partners to retry payouts within a specified timeframe.
4. **Non-Responsive Partners:** Notify admin to reassign bookings or cancel with user compensation.
5. **Earnings Disputes:** Provide detailed breakdowns in the dashboard and enable dispute resolution via admin review.

---

### **6. Timeline for Implementation**

| Week | Task                                       |
| ---- | ------------------------------------------ |
| 1-2  | Partner registration module                |
| 3    | Document verification workflows            |
| 4    | Ad space management features               |
| 5    | Booking management and notifications       |
| 6    | Earnings dashboard and payment integration |
| 7    | Risk management and training materials     |

---

### **7. Conclusion**

This Partner Side module is critical to the success of the marketplace, ensuring a smooth experience for partners while maintaining trust and transparency. With detailed features, efficient workflows, and robust risk management, the platform is set to provide a seamless ecosystem for all stakeholders.


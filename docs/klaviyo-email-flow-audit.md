## Klaviyo Email & SMS Flow Audit - MonetizedProfiles

**Date:** June 23, 2026  
**Account:** MonetizedProfiles (order@monetizedprofiles.com)

---

### AUDIT SUMMARY

Audited all 10 existing Klaviyo flows against the Growth Plan Priority 2 & 3 requirements. Created 8 new email templates and 2 Shopify discount codes to fill the gaps identified below.

---

### EXISTING FLOWS - DETAILED AUDIT

#### 1. Welcome Series (U7Eazd) - LIVE
- **Trigger:** Added to Newsletter list (R4JpCy)
- **Structure:** Conditional split (customer vs non-customer) → 1 email each path
- **Customer path:** "Welcome to the MonetizedProfiles team" (template XGvVAb)
- **Non-customer path:** "Welcome! Here's a BIG surprise" with TIK10 code (template R5cbPu)
- **GAPS:**
  - Only 1 email per path (growth plan calls for 3-5)
  - No product education / how-it-works email
  - No social proof / testimonials email
  - No urgency / expiring offer email
  - No delay between emails (only 1 email, so no cadence)

#### 2. Abandoned Cart (XQML79) - LIVE
- **Trigger:** Started Checkout metric
- **Filter:** Hasn't placed order since flow start; not in flow in last 7 days
- **Email 1:** 2 hours → "Get monetized & start earning in 1 minute" (template SdCkxw)
- **Email 2:** +1 day → "Last chance before stock runs out" (template Vbt4VR)
- **GAPS:**
  - Only 2 emails (plan calls for 3)
  - No discount incentive in the sequence
  - Preview text has grammar issue ("We have not forgot")
  - Missing 3rd email with discount to recover holdouts

#### 3. Browse Abandonment (Wf5zwa) - LIVE
- **Trigger:** Viewed Product metric
- **Filter:** No checkout started, no order placed, not in flow last 30 days
- **Email 1:** 1 hour → "Did you see anything you liked?" (template S3cKSz)
- **GAPS:**
  - Only 1 email (should be 2-3)
  - Missing follow-up with social proof / urgency
  - Empty preview text

#### 4. Post-Purchase Bounce Back (XYcnt9) - LIVE
- **Trigger:** Placed Order
- **Filter:** Exactly 1 order all-time (first-time buyers)
- **Email:** Immediate → "Thanks for ordering! Here's a surprise" (template VyKsk3)
- **GAPS:**
  - Only 1 email, no delay
  - No review request
  - No cross-sell suggestions
  - Empty preview text

#### 5. Post-Purchase Follow Up - Support (RRHZ2s) - LIVE
- **Trigger:** Placed Order
- **Filter:** None (all orders)
- **Email:** 60 hours → "Need help with your order? We're here." (template TsaBBh)
- **STATUS:** Good support check-in. Keep as-is.

#### 6. Customer Winback (R4Pahj) - LIVE
- **Trigger:** Placed Order metric (triggers on metric, filters for no repeat)
- **Filter:** Hasn't placed order since flow start (lapsed 60+ days)
- **Email 1:** 60 days → "Here's how you get monetized" (template UDEVih)
- **Email 2:** +15 days → "Here's 10% OFF" (template YewGjf)
- **STATUS:** Decent structure. Could add a 3rd email but acceptable for now.

#### 7. Price Drop Notification (Rp5WWu) - LIVE
- **Trigger:** Price Drop (5%+ on viewed/carted products, last 60 days)
- **Email:** Immediate → "Big Price Drop Alert" (template WLmBtV)
- **STATUS:** Good automated trigger. Single email is appropriate.

#### 8. Low Inventory Reminder (YA2feP) - LIVE
- **Trigger:** Low Inventory (1 unit remaining for checkout-started audience)
- **Email:** Immediate → "Last chance to get a monetized account" (template XWZcCc)
- **STATUS:** Good urgency trigger. Keep as-is.

#### 9. SMS Welcome Series (YtR9wx) - LIVE
- **Trigger:** Consented to Receive SMS
- **Step 1:** A/B test welcome SMS with $10 off coupon (50/50 split)
- **Step 2:** 3-day delay → conditional split (ordered?) → coupon reminder if no order
- **ISSUES:**
  - Main action still references "TikAccounts" (old brand name) and links to tikaccounts.com
  - Coupon reminder SMS also links to tikaccounts.com
  - A/B test experiment status still "draft" (never started measuring)
  - Variation A correctly says "MonetizedProfiles"
  - Variation B correctly says "MonetizedProfiles"

#### 10. Essential Flow Recommendation (RXZjPu) - DRAFT/Unconfigured
- Order Confirmation email template, never configured with a trigger
- **STATUS:** Unused. Can be deleted or configured.

---

### MISSING FLOWS (from Growth Plan)

| Flow | Status | Priority |
|------|--------|----------|
| VIP / Repeat Buyer | **MISSING** - No flow exists | HIGH |
| Extended Welcome Series | Only 1 email, needs 3-5 | HIGH |
| Abandoned Cart 3rd email | Missing discount incentive | MEDIUM |
| Browse Abandonment 2nd email | Missing follow-up | MEDIUM |
| Post-Purchase review request | No review request flow | MEDIUM |
| SMS Abandoned Cart | No SMS cart abandonment | LOW |
| SMS Order/Shipping Updates | No SMS transactional | LOW |
| SMS Back-in-Stock | No SMS inventory alerts | LOW |

---

### NEW TEMPLATES CREATED

| Template | Klaviyo ID | Purpose | For Flow |
|----------|-----------|---------|----------|
| Welcome Series #2 - How It Works | YezFEt | Product education, 3-step process | Welcome (non-customer path) |
| Welcome Series #3 - Social Proof | Wcg37N | Testimonials + TIK10 reminder | Welcome (non-customer path) |
| Welcome Series #4 - Last Chance Offer | VK6Kej | Expiring discount + product catalog | Welcome (non-customer path) |
| Abandoned Cart #3 - Final Discount | ThCNWG | COMEBACK10 code, 10% off | Abandoned Cart |
| Browse Abandonment #2 - Social Proof | QXqpdk | Trust signals + urgency | Browse Abandonment |
| Post-Purchase #2 - Review Request | SAzL33 | Review CTA + cross-sell | Post-Purchase |
| VIP Repeat Buyer #1 - Thank You | UVprNK | VIP perks + VIP15 code | NEW: VIP flow |
| VIP Repeat Buyer #2 - Exclusive Drop | RNicHC | Early access + VIP15 reminder | NEW: VIP flow |

### SHOPIFY DISCOUNT CODES CREATED

| Code | Discount | Purpose |
|------|----------|---------|
| COMEBACK10 | 10% off all products | Abandoned Cart Email #3 recovery |
| VIP15 | 15% off all products | VIP/Repeat Buyer exclusive |

---

### RECOMMENDED FLOW CONFIGURATIONS (to add in Klaviyo UI)

#### Welcome Series (U7Eazd) - Add to non-customer path:
```
[Existing] Email #1: Welcome! Here's a BIG surprise (immediate)
    ↓ 2-day delay
[NEW] Email #2: How It Works (template YezFEt)
    Subject: "Here's how creators earn with monetized accounts"
    Preview: "3 simple steps to start earning"
    ↓ 2-day delay
[NEW] Email #3: Social Proof (template Wcg37N)
    Subject: "What 100+ creators say about MonetizedProfiles"
    Preview: "Real results from real buyers"
    ↓ 3-day delay
[NEW] Email #4: Last Chance (template VK6Kej)
    Subject: "Your welcome discount expires tonight"
    Preview: "Last chance to use TIK10"
```

#### Abandoned Cart (XQML79) - Add 3rd email:
```
[Existing] Email #1: 2hr delay → "Get monetized & start earning"
[Existing] Email #2: +1 day → "Last chance before stock runs out"
    ↓ 2-day delay
[NEW] Email #3: Final Discount (template ThCNWG)
    Subject: "Here's 10% off to complete your order"
    Preview: "Exclusive discount just for you - code COMEBACK10"
```

#### Browse Abandonment (Wf5zwa) - Add 2nd email:
```
[Existing] Email #1: 1hr delay → "Did you see anything you liked?"
    ↓ 1-day delay
[NEW] Email #2: Social Proof (template QXqpdk)
    Subject: "3 reasons creators trust MonetizedProfiles"
    Preview: "Instant monetization, full transfer, support included"
```

#### Post-Purchase - Add review request:
After the existing support check-in (RRHZ2s, 60 hours):
```
[Existing] Support email: 60hr → "Need help with your order?"
    ↓ 5-day delay (total ~7 days post-purchase)
[NEW] Review Request (template SAzL33)
    Subject: "Quick question about your purchase"
    Preview: "Your 30-second review helps other creators"
```

#### NEW: VIP / Repeat Buyer Flow
```
Trigger: Placed Order metric
Filter: Has placed order > 1 time (all time)
    ↓ Immediate
[NEW] VIP Thank You (template UVprNK)
    Subject: "You've been upgraded to VIP status"
    Preview: "Exclusive perks + 15% off inside"
    ↓ 14-day delay
[NEW] VIP Exclusive Drop (template RNicHC)
    Subject: "VIP early access: new accounts just dropped"
    Preview: "First dibs before anyone else"
```

---

### SMS FLOW FIXES NEEDED (Priority 3)

1. **Fix brand references:** Update SMS Welcome Series main action body from "TikAccounts" to "MonetizedProfiles" and URL from tikaccounts.com to monetizedprofiles.com
2. **Start A/B test:** The experiment is in "draft" status - needs to be started to measure winner
3. **Add SMS flows per growth plan:**
   - SMS Abandoned Cart (1 message, 4hr delay, only if email not opened)
   - SMS Order confirmation (transactional)
   - SMS Back-in-stock alerts

---

### NEXT STEPS

1. **Add the new emails to existing flows in Klaviyo UI** using the template IDs above
2. **Fix SMS old brand references** (TikAccounts → MonetizedProfiles)
3. **Create the VIP/Repeat Buyer flow** in Klaviyo using the trigger config above
4. **A/B test subject lines** on the welcome series (highest volume flow)
5. **Monitor flow performance** after 2 weeks: open rates, click rates, conversion
6. **Wire cart events** from the Next.js site to Klaviyo tracking API
7. **Add KLAVIYO_PRIVATE_API_KEY** to Vercel environment variables

# Restaurant Website — Project Context

## 1. Project Overview

We are building a modern restaurant website focused primarily on:

* Food discovery
* Food menu browsing
* Food gallery
* Online ordering
* User login/account
* Cart and checkout
* Restaurant information

The current phase is **frontend/client-side only**.

Backend functionality, real authentication, payment processing, order processing, restaurant admin, and SaaS management will be implemented later.

The frontend should therefore use mock/static data where necessary while keeping the architecture ready for future API integration.

---

# 2. Long-Term Product Direction

Although the current implementation is for a restaurant website, the long-term goal is to convert the product into a **multi-restaurant SaaS platform**.

Do not architect the frontend as a hard-coded one-off restaurant website.

The application should eventually support:

```text
Restaurant A
Restaurant B
Restaurant C
...
```

using the same frontend components and application architecture.

Restaurant-specific data should eventually be configurable.

Examples:

```text
restaurant
├── branding
│   ├── name
│   ├── logo
│   ├── primaryColor
│   ├── secondaryColor
│   ├── fonts
│   └── heroImage
│
├── information
│   ├── phone
│   ├── email
│   ├── address
│   ├── openingHours
│   ├── socialLinks
│   └── deliveryAreas
│
├── menu
│   ├── categories
│   ├── products
│   ├── variants
│   └── addOns
│
├── offers
├── gallery
├── reviews
├── deliverySettings
└── paymentMethods
```

Avoid embedding restaurant-specific information directly inside reusable UI components.

---

# 3. Target Market

Primary market:

**Bangladesh**

Primary users:

* Bangladeshi customers
* All age groups
* Mobile-first users
* Users with different levels of technical familiarity

The experience should therefore be:

* Very easy to understand
* Fast
* Mobile-friendly
* Accessible
* Familiar
* Low-friction
* Clear about prices
* Clear about ordering steps

The application should support future localization for:

* English
* Bangla

For typography, the preferred fonts are:

```text
English: Inter
Bangla: Noto Sans Bengali
```

---

# 4. Core Product Priorities

The ordering experience is the primary product experience.

The user should be able to understand the following within seconds:

```text
1. What restaurant is this?
2. What food is available?
3. What food is popular?
4. How much does it cost?
5. How do I add it to my cart?
6. How do I checkout?
```

Primary interaction hierarchy:

```text
Discover food
      ↓
Browse menu
      ↓
View/customize product
      ↓
Add to cart
      ↓
Review cart
      ↓
Checkout
      ↓
Order confirmation
```

Marketing content such as About, Gallery, Reviews, and Restaurant Story is secondary to the food-ordering experience.

---

# 5. Current Scope

Build only the frontend/client application.

The following functionality may currently be simulated:

* Authentication
* OTP
* Cart persistence
* Checkout
* Coupon validation
* Order submission
* Payment
* Order tracking
* Reviews
* Favorites

Use realistic mock data.

UI behavior should nevertheless feel production-ready.

---

# 6. Homepage Structure

The homepage must contain the following sections in this exact general order:

```text
01. Header
02. Hero
03. Food Categories
04. Popular / Bestselling Items
05. Special Offers / Combo Deals
06. Explore Our Menu
07. Food Gallery
08. About / Restaurant Story
09. Why Choose Us
10. Customer Reviews
11. Location & Restaurant Information
12. Final Order CTA
13. Footer
```

---

# 7. Header

Desktop navigation should include:

```text
Logo

Home
Menu
Offers
Gallery
About
Contact

Search
Login / Account
Cart
Order Now
```

Requirements:

* Sticky header
* Clear active-page state
* Cart item badge
* Strong `Order Now` CTA
* Search should be easy to access
* Header should become slightly more compact after scrolling if appropriate

Do not overcrowd the header.

The most visually important navigation actions are:

```text
Menu
Cart
Order Now
```

---

# 8. Mobile Navigation

Mobile must be treated as a first-class experience.

Top mobile header:

```text
Menu / Hamburger
Logo
Search
Cart
```

Recommended persistent bottom navigation:

```text
Home
Menu
Search
Orders
Account
```

Once there are products in the cart, show a persistent mobile cart summary above the bottom navigation.

Example:

```text
3 items • ৳1,050        View Cart →
```

---

# 9. Hero Section

The hero should not occupy excessive screen height.

Recommended desktop height:

```text
approximately 500–550px
```

Structure:

```text
LEFT

Headline
Supporting text

Order Now
View Menu

Open Now
30–45 min
Delivery & Pickup


RIGHT

Large high-quality food photograph

Optional:
Rating card
```

Example headline:

```text
Freshly Made.
Delivered With Love.
```

Primary CTA:

```text
Order Now
```

Secondary CTA:

```text
View Menu
```

Food photography should receive strong visual priority.

Avoid unnecessary decorative UI.

---

# 10. Food Categories

Show visual category cards.

Example categories:

```text
Biryani
Burger
Pizza
Chinese
Kebab
Rice
Drinks
Desserts
```

Requirements:

* Image or icon
* Category name
* Entire card clickable
* Mobile horizontal scroll
* Clicking should navigate/filter menu products

Keep categories data-driven.

---

# 11. Popular / Bestselling Products

Homepage should display approximately:

```text
4–8 products
```

Product card should support:

```text
Product image
Product name
Short description
Price in BDT
Old price if discounted
Rating
Review count
Bestseller badge
Spicy indicator if relevant
Favorite button
Add button
Availability state
```

Price format:

```text
৳350
```

Do not hide the price.

Users should be able to add products quickly.

If a product has no required options:

```text
Add immediately
```

If required customization exists:

```text
Open Product Details / Customization UI
```

---

# 12. Product Card Behavior

Minimum states:

```text
Default
Hover
Focus
Loading
Added
Sold Out
Unavailable
Discounted
Bestseller
```

Do not make the entire product ordering experience depend on opening a separate page.

Fast-add should be supported.

---

# 13. Product Details UI

Clicking a customizable product should open:

Desktop:

```text
Modal / side drawer
```

Mobile:

```text
Bottom sheet
```

Product detail structure:

```text
Product image

Product name
Rating
Description
Base price

Required options

Variants:
- Regular
- Large

Add-ons:
- Extra Cheese
- Fries
- Extra Patty
etc.

Special instructions textarea

Quantity selector

Add to Cart button
```

Example:

```text
Chicken Cheese Burger
৳250

Choose Size

● Regular        ৳250
○ Large          ৳320

Add-ons

□ Extra Cheese   +৳40
□ French Fries   +৳100

Special Instructions

Less spicy, no onion...

−   1   +

Add to Cart • ৳390
```

Required modifiers must be validated before adding to cart.

---

# 14. Special Offers

Avoid large auto-rotating hero sliders.

Use static offer cards with clear pricing.

Recommended layout:

```text
Large featured offer

+ two smaller promotional cards
```

Offer examples:

```text
Family Feast
Lunch Special
Weekend Combo
Buy 1 Get 1
Ramadan / Iftar Offer
Eid Offer
Student Deal
```

Offer card should support:

```text
Title
Description
Image
Original price
Discount price
Savings
CTA
```

---

# 15. Explore Our Menu

This is one of the most important homepage sections.

Heading:

```text
Explore Our Menu
```

Use horizontal category filters.

Example:

```text
Popular
Biryani
Chicken
Beef
Chinese
Burger
Drinks
```

Show approximately:

```text
6–8 items
```

on the homepage.

Then show:

```text
View Full Menu
```

Do not render the entire restaurant menu on the homepage.

---

# 16. Full Menu Page

The `/menu` page should eventually support:

* Search
* Category filtering
* Food cards
* Sort if useful
* Availability
* Offers
* Sticky category navigation
* Cart interaction

The menu UX should prioritize speed over visual complexity.

---

# 17. Gallery

Homepage gallery:

```text
5–6 high-quality images
```

Possible gallery types:

```text
Food
Restaurant
Chef
Interior
Events
```

Use a clean grid or masonry layout.

Clicking an image can open a lightbox.

Do not show excessive gallery images on the homepage.

---

# 18. About / Restaurant Story

Keep homepage content short.

Recommended structure:

```text
Image

Our Story

2–3 short paragraphs

Learn More
```

Avoid putting the entire About page content on the homepage.

---

# 19. Why Choose Us

Use four concise benefits.

Recommended:

```text
Fresh Ingredients
Quality Cooking
Fast Delivery
Easy Ordering
```

Each should contain:

```text
Icon
Short title
One-line description
```

Avoid large marketing paragraphs.

---

# 20. Customer Reviews

Homepage should show:

```text
Overall rating
Total review count
3 review cards
```

Example:

```text
4.8 / 5
★★★★★
Based on 1,250+ reviews
```

Review card:

```text
Stars
Short review
Customer name
Optional avatar
Optional location
```

Avoid fake-looking overly long testimonials.

---

# 21. Restaurant Information

Homepage must contain restaurant operational details.

Include:

```text
Address
Phone
Opening hours
Restaurant status
Delivery information
Map
Directions button
Call button
```

Example:

```text
Saturday–Thursday
11:00 AM – 11:00 PM

Friday
2:00 PM – 11:30 PM
```

Mobile ordering:

```text
Information first
Map second
```

---

# 22. Final CTA

Simple final conversion section.

Example:

```text
Hungry Already?

Your favourite food is just a few taps away.

Order Now
```

Use one strong primary action.

Do not clutter this section with multiple CTAs.

---

# 23. Footer

Recommended columns:

```text
Restaurant
- Home
- Menu
- Offers
- Gallery
- About
- Contact

Customer
- My Account
- Orders
- Track Order
- Delivery Information
- FAQ

Legal
- Privacy Policy
- Terms
- Refund Policy

Contact
- Phone
- WhatsApp
- Email
- Address
```

Also support:

```text
Facebook
Instagram
TikTok
YouTube
```

---

# 24. Authentication

Authentication is a core feature.

Bangladesh users should be able to eventually authenticate primarily through mobile number.

Preferred future flow:

```text
Mobile Number
      ↓
OTP
      ↓
Logged In
```

Example:

```text
+880 1XXXXXXXXX
```

Optional future methods:

```text
Email
Google
```

For now, the frontend may simulate authentication.

---

# 25. Customer Account

Account section should eventually include:

```text
Profile
Saved Addresses
My Orders
Order Details
Reorder
Favorites
Coupons
Security
Logout
```

Important routes:

```text
/account
/account/orders
/account/orders/[id]
/account/addresses
/account/favorites
/account/profile
```

---

# 26. Cart

Prefer:

Desktop:

```text
Cart drawer
```

Mobile:

```text
Full-screen cart or bottom-sheet-based experience
```

Cart should display:

```text
Product
Selected variant
Selected add-ons
Quantity
Unit price
Total price
Edit action
Remove action

Subtotal
Delivery charge
Discount
Coupon
Total
```

Example:

```text
Kacchi Biryani × 2
৳700

Chicken Burger × 1
৳250

Subtotal       ৳950
Delivery        ৳60
Discount       -৳100

Total           ৳910

Proceed to Checkout
```

---

# 27. Checkout

Checkout should be extremely simple.

Recommended flow:

```text
1. Order Method
2. Customer Information
3. Delivery Address
4. Payment Method
5. Review Order
6. Place Order
```

Order Method:

```text
Delivery
Pickup
```

Customer fields:

```text
Name
Mobile
Email optional
```

Delivery address should support Bangladesh-friendly fields:

```text
Division
City
Area
Road
House
Flat/Floor
Landmark
```

Future support:

```text
Map pin
Delivery zones
Zone-based delivery fees
```

---

# 28. Payment Methods

Current frontend can display mock payment methods.

Future Bangladesh payment options may include:

```text
Cash on Delivery
bKash
Nagad
Card
Payment Gateway
```

Payment providers must remain configurable.

Do not hard-code payment logic into UI components.

---

# 29. Order Confirmation

After checkout show:

```text
Order Confirmed

Order number
Order summary
Delivery estimate
Customer address
Payment method
Track Order CTA
```

---

# 30. Order Tracking

Future order states:

```text
Order Received
Preparing
Ready
Rider Assigned
Out for Delivery
Delivered
Cancelled
```

For the frontend-only phase, simulate these states.

---

# 31. Route Structure

Recommended application routes:

```text
/
├── /menu
│   └── /menu/[category]
│
├── /offers
├── /gallery
├── /about
├── /contact
│
├── /cart
├── /checkout
├── /order-success
├── /track-order/[id]
│
├── /login
├── /register
│
├── /account
│   ├── /orders
│   ├── /orders/[id]
│   ├── /addresses
│   ├── /favorites
│   └── /profile
│
├── /privacy-policy
├── /terms
└── /refund-policy
```

---

# 32. Visual Style

Overall visual direction:

```text
Modern
Warm
Clean
Food-focused
Premium but approachable
Minimal clutter
High readability
```

Avoid:

* Over-designed glassmorphism
* Excessive gradients
* Excessive animations
* Huge text everywhere
* Tiny typography
* Overly dark interfaces
* Unnecessary carousels
* Complicated menus
* Excessive floating decorations

Food photography should carry much of the visual appeal.

---

# 33. Suggested Design Tokens

Initial visual palette:

```text
Primary Orange:
#E8572A

Deep Green:
#17624F

Dark Text:
#1D2522

Muted Text:
#6B706D

Background:
#FFF9F5

Surface:
#FFFFFF

Border:
#EAE5E1

Rating / Accent:
#F4B942
```

These colors must eventually become theme tokens because future SaaS restaurants will use different brand colors.

Do not scatter raw colors throughout components.

Prefer centralized design tokens / CSS variables / theme configuration.

Example:

```css
--color-primary
--color-secondary
--color-background
--color-surface
--color-text
--color-text-muted
--color-border
--color-rating
```

---

# 34. Typography

Recommended fonts:

```text
English:
Inter

Bangla:
Noto Sans Bengali
```

Approximate typography scale:

```text
Hero H1
Desktop: 52px
Mobile: 36px

Section H2
Desktop: 36px
Mobile: 28px

Card / H3
Desktop: 20px
Mobile: 18px

Body
16–18px

Helper / metadata
14px

Button
16px semibold

Price
18–20px bold
```

Avoid overly thin font weights.

Accessibility and readability are more important than decorative typography.

---

# 35. Layout

Recommended maximum content width:

```text
1200–1280px
```

Desktop grid:

```text
12 columns
24px gap
```

Approximate section spacing:

```text
Desktop:
88–104px

Tablet:
72px

Mobile:
56–64px
```

Do not give all homepage sections equal visual weight.

Priority order:

```text
Hero
Categories
Products
Offers
Menu

then

Gallery
About
Benefits
Reviews
Location
```

---

# 36. UI Component System

Build reusable components.

Suggested structure:

```text
components
├── layout
│   ├── Header
│   ├── MobileNavigation
│   ├── Footer
│   └── SectionContainer
│
├── restaurant
│   ├── RestaurantStatus
│   ├── OpeningHours
│   ├── RestaurantInfo
│   └── LocationMap
│
├── menu
│   ├── CategoryCard
│   ├── CategoryTabs
│   ├── ProductCard
│   ├── ProductGrid
│   ├── ProductDetails
│   ├── VariantSelector
│   ├── AddOnSelector
│   └── QuantitySelector
│
├── cart
│   ├── CartDrawer
│   ├── CartItem
│   ├── CartSummary
│   └── MobileCartBar
│
├── offers
│   ├── OfferCard
│   └── FeaturedOffer
│
├── gallery
│   ├── GalleryGrid
│   └── GalleryLightbox
│
├── reviews
│   ├── ReviewCard
│   └── RatingSummary
│
├── auth
│   ├── LoginForm
│   ├── PhoneInput
│   └── OTPInput
│
└── ui
    ├── Button
    ├── Badge
    ├── Card
    ├── Modal
    ├── Drawer
    ├── BottomSheet
    ├── Tabs
    ├── Toast
    ├── Skeleton
    └── EmptyState
```

Exact folder names may follow the project's framework conventions.

---

# 37. Data Modeling

Use structured mock data instead of writing product content directly inside components.

Example:

```ts
type Product = {
  id: string
  name: string
  slug: string
  description: string
  image: string
  price: number
  oldPrice?: number
  rating?: number
  reviewCount?: number
  categoryId: string
  bestseller?: boolean
  spicyLevel?: number
  available: boolean
  variants?: ProductVariant[]
  addOns?: ProductAddOn[]
}
```

Category example:

```ts
type MenuCategory = {
  id: string
  name: string
  slug: string
  image?: string
  sortOrder: number
}
```

Restaurant example:

```ts
type Restaurant = {
  id: string
  name: string
  logo: string

  branding: {
    primaryColor: string
    secondaryColor: string
  }

  contact: {
    phone: string
    email?: string
    whatsapp?: string
  }

  address: {
    division?: string
    city: string
    area?: string
    street?: string
  }

  openingHours: OpeningHours[]
}
```

Design data models so they can later be populated by an API.

---

# 38. Loading States

Every data-driven UI should have appropriate loading states.

Examples:

```text
Product cards:
Skeleton cards

Categories:
Skeleton chips/cards

Account:
Skeleton sections

Cart submission:
Button loading state
```

Avoid large blank areas during loading.

---

# 39. Empty States

Create proper empty states.

Examples:

Cart:

```text
Your cart is empty.

Looks like you haven't added anything yet.

Browse Menu
```

Favorites:

```text
No favorites yet.

Save dishes you love for faster ordering next time.
```

Orders:

```text
No orders yet.

Your previous orders will appear here.
```

---

# 40. Error States

Provide friendly error handling for:

```text
Failed menu load
Failed product load
Invalid coupon
Unavailable item
Failed login
Failed checkout
Network problems
```

Always provide a recovery action where possible.

Example:

```text
Something went wrong while loading the menu.

Try Again
```

---

# 41. Cart Feedback

After adding an item, provide immediate feedback.

Example toast:

```text
✓ Kacchi Biryani added to your cart

View Cart
```

Do not make users guess whether the item was added.

---

# 42. Accessibility

Accessibility is mandatory.

Requirements:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Proper button elements
* Proper form labels
* Sufficient contrast
* Alt text for meaningful images
* Accessible modal/dialog behavior
* Correct ARIA only where necessary
* Large tap targets
* Do not rely only on color to communicate state

Recommended minimum interactive target:

```text
44–48px
```

---

# 43. Responsive Design

Primary breakpoints should follow content needs rather than device names.

Ensure excellent behavior across:

```text
Small mobile
Large mobile
Tablet
Laptop
Desktop
Large desktop
```

Mobile is not simply a scaled-down desktop version.

Reconsider layout and interaction patterns for mobile.

Examples:

Desktop product details:

```text
Modal / drawer
```

Mobile:

```text
Bottom sheet
```

Desktop navigation:

```text
Top navigation
```

Mobile:

```text
Compact top header + bottom navigation
```

---

# 44. Performance

Food websites are image-heavy.

Performance priorities:

* Responsive images
* Correct image dimensions
* Lazy-loading below-the-fold images
* Avoid unnecessary JavaScript
* Avoid heavy animations
* Avoid huge hero images
* Use image optimization supported by the framework
* Prevent layout shift
* Skeleton loaders where useful

Performance is part of UX.

---

# 45. Animation

Use animation only when it improves feedback.

Good examples:

```text
Add-to-cart feedback
Modal transitions
Bottom-sheet movement
Hover transitions
Accordion expansion
Toast appearance
```

Avoid:

```text
Constant floating objects
Large parallax effects
Heavy page transitions
Auto-moving UI everywhere
```

Motion should be subtle and fast.

---

# 46. Content Tone

The UI copy should be:

* Friendly
* Direct
* Simple
* Human
* Easy for non-native English users

Avoid unnecessarily sophisticated wording.

Good:

```text
Add to Cart
View Menu
Order Now
Open Now
Sold Out
View Order
Call Us
Get Directions
```

Avoid vague CTA labels such as:

```text
Explore Experience
Discover More
Proceed Further
```

when a clearer action exists.

---

# 47. Bangladesh-Specific UX

Remember the primary audience is Bangladesh.

Important considerations:

```text
Currency:
৳ / BDT

Phone:
+880

Local payment methods:
bKash
Nagad
Cash on Delivery

Common address structure:
Division
City
Area
Road
House
Flat/Floor
Landmark
```

The UX should work well for users who are more comfortable using a mobile number than email.

---

# 48. Image Direction

Food images should look:

* Realistic
* Warm
* Fresh
* Appetizing
* High quality
* Consistent

Prefer authentic food photography over generic illustration-heavy design.

Images should be easy to replace per restaurant later.

---

# 49. SaaS Readiness

Whenever implementing a feature, ask:

```text
Can another restaurant reuse this component
without modifying the component itself?
```

If not, reconsider the architecture.

Future SaaS configuration may control:

```text
Restaurant name
Logo
Colors
Fonts
Homepage sections
Section visibility
Categories
Products
Offers
Gallery
Contact details
Delivery zones
Delivery fees
Payment methods
Social links
Opening hours
Policies
```

Avoid coupling business data to presentation logic.

---

# 50. Section Configuration

Ideally homepage sections should eventually be representable as configuration.

Example:

```ts
const homepageSections = [
  {
    type: "hero",
    enabled: true,
  },
  {
    type: "categories",
    enabled: true,
  },
  {
    type: "popularProducts",
    enabled: true,
  },
  {
    type: "offers",
    enabled: true,
  },
  {
    type: "menuPreview",
    enabled: true,
  },
  {
    type: "gallery",
    enabled: true,
  },
]
```

Do not over-engineer the first version, but avoid decisions that prevent this later.

---

# 51. State Management

Keep state boundaries clear.

Likely application state categories:

```text
Restaurant configuration
Menu data
Cart
Authentication
Customer profile
Favorites
Checkout
Orders
UI state
```

Do not unnecessarily put every UI state into a global store.

Global state is appropriate for things such as:

```text
Cart
Authenticated user
Restaurant context
```

Local UI state should remain local where possible.

---

# 52. Search

Search should eventually support:

```text
Product name
Category
Possibly ingredients / keywords
```

Search results must show:

```text
Image
Name
Price
Category
Availability
Add action
```

Search should be easy to access from both desktop and mobile.

---

# 53. Favorites

Product cards should support future favorite functionality.

Example:

```text
♡
```

Logged-out behavior can eventually:

```text
prompt login
```

or support temporary local favorites.

Do not allow favorite UI to overpower the primary Add action.

---

# 54. Internationalization

Do not build strings into deeply nested components if avoidable.

The project should later support:

```text
English
Bangla
```

UI layout must tolerate longer Bangla strings.

Avoid fixed-width text containers that easily break.

---

# 55. SEO Considerations

Although current work is frontend-focused, public restaurant pages should remain SEO-friendly.

Use semantic page structure:

```text
header
nav
main
section
article
footer
```

Product/menu content should eventually be indexable.

Avoid turning the entire application into client-only rendered content if the framework supports SSR/SSG and it benefits SEO.

Follow the chosen framework's best practices.

---

# 56. Current Non-Goals

Do not build the following yet unless explicitly requested:

* Full backend
* Real database
* Real restaurant admin panel
* Real SaaS tenant management
* Billing/subscriptions
* Production payment processing
* Real delivery/rider system
* Real SMS OTP
* Real inventory sync
* Real POS integration

Frontend placeholders or mock flows are acceptable.

---

# 57. Development Principles

When implementing new UI:

1. Prioritize usability over decoration.
2. Prioritize mobile experience.
3. Keep product/order actions obvious.
4. Keep pricing visible.
5. Reuse existing components.
6. Avoid duplication.
7. Use data-driven rendering.
8. Keep restaurant branding configurable.
9. Preserve accessibility.
10. Preserve future SaaS flexibility.
11. Do not over-engineer prematurely.
12. Keep components maintainable.
13. Follow the existing project's coding style.
14. Do not introduce unnecessary dependencies.

---

# 58. Decision Priority

When multiple design options are possible, prioritize in this order:

```text
1. User experience
2. Clarity
3. Ordering speed
4. Accessibility
5. Mobile usability
6. Performance
7. Maintainability
8. SaaS reusability
9. Visual aesthetics
```

A visually impressive design that makes ordering harder is considered a worse solution.

---

# 59. Core UX Rule

The most important rule for the entire project:

> A customer should be able to discover a dish, understand its price, customize it if needed, add it to the cart, and proceed toward checkout with as little friction as possible.

Every UI decision should support this goal.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

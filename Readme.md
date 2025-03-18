### Valuation Service

## Overview

The Valuation Service calculates delivery costs for the Commune Drop platform. It determines pricing based on distance, parcel size, weight, urgency, and other factors to provide accurate and fair pricing for both customers and carriers.

## Features

- Dynamic pricing based on multiple factors
- Distance-based calculations using mapping services
- Weight and dimension-based pricing tiers
- Time-of-day and demand-based surge pricing
- Special handling fees for fragile or hazardous items
- Promotional discounts and coupon integration
- Custom pricing rules for enterprise clients
- Historical pricing data for analytics

## Dependencies

- Location Service: For distance and route calculations
- Order Service: For order details and specifications
- External Mapping APIs: For distance and time estimates
- Analytics Service: For demand forecasting

## Technology Stack

- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB
- Caching: Redis for pricing rules and calculations
- Geospatial: Google Maps/Mapbox APIs
- Machine Learning: Optional for predictive pricing models

## Setup

### Prerequisites

- Node.js v16+
- MongoDB
- Redis
- Mapping API keys (Google Maps, Mapbox, etc.)

### Quick Start

1. Clone the repository

```shellscript
git clone https://github.com/commune-drop/valuation-service.git
cd valuation-service
```

2. Install dependencies

```shellscript
npm install
```

3. Configure environment variables

```shellscript
cp .env.example .env
# Edit .env with your configuration
```

4. Start the service

```shellscript
npm start
```

For development:

```shellscript
npm run dev
```

## Configuration

Key environment variables:

```plaintext
PORT=3004
MONGODB_URI=mongodb://localhost:27017/valuation-service
LOCATION_SERVICE_URL=http://location-service:3002
ORDER_SERVICE_URL=http://order-service:3001
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REDIS_URL=redis://localhost:6379
BASE_PRICING_ENABLED=true
SURGE_PRICING_ENABLED=true
PROMOTIONAL_PRICING_ENABLED=true
```

## Pricing Factors

The service calculates prices based on:

- Base distance fee
- Per-kilometer/mile rate
- Parcel size categories (small, medium, large, extra-large)
- Weight tiers with additional fees
- Time of day multipliers
- Demand-based surge pricing
- Special handling requirements
- Priority/express delivery options
- Carrier quality/rating premiums

## Pricing Models

The service supports multiple pricing models:

- Standard distance-based pricing
- Zone-based flat rate pricing
- Subscription-based discounted pricing
- Enterprise custom pricing
- Promotional and seasonal pricing

## Caching Strategy

- Pricing rules cached in Redis
- Common routes and distances cached
- Surge pricing factors updated periodically
- Promotional rules cached with TTL

## Integration Points

- Real-time pricing for order creation
- Batch pricing for enterprise clients
- Webhook notifications for pricing changes
- Pricing history API for analytics
- Admin interface for pricing rule management

## Monitoring

The service includes:

- Pricing anomaly detection
- Performance metrics for calculation speed
- Logging of pricing factors for auditing
- Comparison of estimated vs. actual delivery costs

## Testing

Includes comprehensive tests for:

- Unit tests for pricing algorithms
- Integration tests with mapping services
- Load tests for high-volume scenarios
- A/B testing framework for pricing strategies

## License

MIT

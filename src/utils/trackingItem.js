import * as DefaultTrackingItemImage from 'assets/images/index.square-grid-loader.svg';

export default class TrackingItemUtils {
  static trackingItemType = {
    BILL: 'BILL',
    RENT: 'RENT',
    PARKING: 'PARKING',
    SUBSCRIPTION: 'SUBSCRIPTION',
  };

  static trackingItemFrequency = {
    DAILY: 'DAILY',
    WEEKLY: 'WEEKLY',
    BIWEEKLY: 'BIWEEKLY',
    MONTHLY: 'MONTHLY',
    ANNUALLY: 'ANNUALLY',
  };

  static billFrequencyOptions = [
    {
      label: 'Daily',
      value: TrackingItemUtils.trackingItemFrequency.DAILY,
    },
    {
      label: 'Weekly',
      value: TrackingItemUtils.trackingItemFrequency.WEEKLY,
    },
    {
      label: 'Biweekly',
      value: TrackingItemUtils.trackingItemFrequency.BIWEEKLY,
    },
    {
      label: 'Monthly',
      value: TrackingItemUtils.trackingItemFrequency.MONTHLY,
    },
    {
      label: 'Annually',
      value: TrackingItemUtils.trackingItemFrequency.ANNUALLY,
    },
  ];

  static getLoadingImage = () => DefaultTrackingItemImage;
}


import java.util.Arrays;
public class Calculator {
  public static double mean(double[] arr) { return Arrays.stream(arr).average().orElse(Double.NaN); }
  public static double median(double[] arr) {
    Arrays.sort(arr);
    int n = arr.length;
    return n % 2 == 0 ? (arr[n/2 - 1] + arr[n/2]) / 2 : arr[n/2];
  }
}

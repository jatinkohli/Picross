import sys

def main(args):
    size = int(args[1])
    
    while True:
        val = input("Line/Col info: ")
        vals = val.split(" ");

        locs = []
        sum = len(vals) - 1
        for num in vals:
            sum += int(num)

        runningSum = 0
        for num in vals:
            num = int(num)
            if size - sum < num:
                for i in range(num - size + sum):
                    locs.append(num - i - 1 + runningSum)
            runningSum += num + 1
        print(locs)

if __name__ == '__main__':
    main(sys.argv)

import { Text, WriteArgs } from '../types'
import { write, writeLine } from '../write'


declare global {
    interface String {
        write(args?: Partial<WriteArgs> | Text, ...text: Text[]): WriteArgs
        writeLine(args?: Partial<WriteArgs> | Text, ...text: Text[]): WriteArgs
    }
}


String.prototype.write = function (args?: Partial<WriteArgs> | Text, ...text: Text[]): WriteArgs {
	return typeof args == 'string' || Array.isArray(args)
		? write(write(this.valueOf()), ...[args, ...text])
		: write(args, this.valueOf()).write(...text)
}

String.prototype.writeLine = function (args?: Partial<WriteArgs> | Text, ...text: Text[]): WriteArgs {
	return typeof args == 'string' || Array.isArray(args)
		? writeLine(write(this.valueOf()), ...[args, ...text])
		: write(args, this.valueOf()).writeLine(...text)
}

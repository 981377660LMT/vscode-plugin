import * as vscode from 'vscode'

function disposeAll(disposables: vscode.Disposable[]): void {
  while (disposables.length) {
    const item = disposables.pop()
    if (item) {
      item.dispose()
    }
  }
}

/**
 * 官方demo
 */
abstract class Disposable {
  private _isDisposed = false
  protected _disposables: vscode.Disposable[] = []

  dispose(): any {
    if (this._isDisposed) {
      return
    }
    this._isDisposed = true
    disposeAll(this._disposables)
  }

  protected _register<T extends vscode.Disposable>(value: T): T {
    if (this._isDisposed) {
      value.dispose()
    } else {
      this._disposables.push(value)
    }
    return value
  }

  protected get isDisposed(): boolean {
    return this._isDisposed
  }
}

export { Disposable, disposeAll }
